import { ref, watchEffect } from "vue";

const MAX_ZOOM = 3;

export default function useImageModal() {
  const isZoomAble = ref(true);
  const isDrag = ref(false);

  const imageRef = ref<HTMLImageElement | null>(null);

  const transform = ref({ x: 0, y: 0 });
  const prevTransform = ref({ x: 0, y: 0 });
  const currentImageSize = ref({ height: 0, width: 0 });
  const mousePos = ref({ x: 0, y: 0 });
  const mousePosRatio = ref({ x: 0, y: 0 });

  const scale = ref(1);

  const update = () => {
    const imageEle = imageRef.value;
    if (!imageEle) return;

    imageEle.style.transform = `translate(${-transform.value.x}px, ${-transform
      .value.y}px) scale(${scale.value})`;
  };

  const updateMousePos = (clientX: number, clientY: number) => {
    const imageEle = imageRef.value;
    if (!imageEle) return 1;

    const mousePositionInImage = { x: 0, y: 0 };
    const imageRect = imageEle.getBoundingClientRect();

    mousePositionInImage.x = clientX - imageRect.left;
    mousePositionInImage.y = clientY - imageRect.top;

    (mousePosRatio.value.x = +(
      mousePositionInImage.x / currentImageSize.value.width
    ).toFixed(2)),
      (mousePosRatio.value.y = +(
        mousePositionInImage.y / currentImageSize.value.height
      ).toFixed(2));

    return 0;
  };

  const autoFit = () => {
    const imageEle = imageRef.value;
    if (!imageEle) return;

    const SPACER = 20;
    const imageRect = imageEle.getBoundingClientRect();

    const isFlowHeight = currentImageSize.value.height > window.innerHeight;
    const isFlowWidth = currentImageSize.value.width > window.innerWidth;

    const isCover = {
      top: imageRect.top < 50 + SPACER,
      bottom: imageRect.bottom > window.innerHeight - SPACER,
      left: imageRect.left < SPACER,
      right: imageRect.right > window.innerWidth - SPACER,
    };

    const isContain = !isFlowHeight && !isFlowWidth;

    const isFlowOutOfScreen =
      isCover.top && isCover.bottom && isCover.left && isCover.right;

    if (isFlowOutOfScreen || isContain) {
      isDrag.value = false;
      return;
    } else {
      //  imageEle.style.transition = "transform linear .15s";
    }

    const newTransform = {
      x: transform.value.x,
      y: transform.value.y,
    };

    if (!(!isCover.top && !isCover.bottom)) {
      if (!isCover.top) newTransform.y += imageRect.top - (50 + SPACER);
      if (!isCover.bottom)
        newTransform.y -= window.innerHeight - SPACER - imageRect.bottom;
    }
    if (!isCover.left) newTransform.x += imageRect.left - SPACER;
    if (!isCover.right)
      newTransform.x -= window.innerWidth - SPACER - imageRect.right;

    transform.value.x = newTransform.x;
    transform.value.y = newTransform.y;

    isDrag.value = false;
    update();

    //   setTimeout(() => {
    //      imageEle.style.transition = "none";
    //   }, 200);
  };

  const startDrag = (clientX: number, clientY: number) => {
    mousePos.value.x = clientX;
    mousePos.value.y = clientY;

    prevTransform.value.x = transform.value.x;
    prevTransform.value.y = transform.value.y;

    const err = updateMousePos(clientX, clientY);
    if (err) return;

    isDrag.value = true;
  };

  const drag = (clientX: number, clientY: number) => {
    if (!isDrag.value || scale.value === 1) return;

    const imageEle = imageRef.value;
    if (!imageEle) return;

    const disX = clientX - mousePos.value.x;
    const disY = clientY - mousePos.value.y;

    transform.value.x = prevTransform.value.x - disX;
    transform.value.y = prevTransform.value.y - disY;

    update();
  };

  const stopDrag = (clientX: number, clientY: number, skipZoom?: boolean) => {
    if (clientX === mousePos.value.x && clientY === mousePos.value.y) {
      if (!skipZoom) {
        switch (scale.value) {
          case 1: {
            zoom(MAX_ZOOM);
            break;
          }
          case MAX_ZOOM: {
            zoom(1);
            break;
          }
        }
      }

      console.log("stop");

      isDrag.value = false;
      return;
    }

    autoFit();
  };

  const zoom = (factor: number) => {
    let newScale = factor;

    if (newScale == scale.value) return;
    //   if reach limit
    if (newScale > scale.value) {
      if (scale.value === MAX_ZOOM) return;
    }

    if (newScale > MAX_ZOOM) newScale = MAX_ZOOM;
    if (newScale < 1) newScale = 1;

    scale.value = newScale;

    const imageEle = imageRef.value;
    if (!imageEle) return;
    const newImageSize = {
      width: imageEle.clientWidth * scale.value,
      height: imageEle.clientHeight * scale.value,
    };

    const diffW = newImageSize.width - imageEle.clientWidth;
    const diffH = newImageSize.height - imageEle.clientHeight;

    transform.value.x = diffW * mousePosRatio.value.x;
    transform.value.y = diffH * mousePosRatio.value.y;

    currentImageSize.value.height = newImageSize.height;
    currentImageSize.value.width = newImageSize.width;

    if (scale.value === 1) isZoomAble.value = true;
    else if (scale.value === MAX_ZOOM) isZoomAble.value = false;

    update();
  };

  const handleWheel = (e: WheelEvent) => {
    console.log("wheel");

    const factor = 0.5;

    const imageEle = imageRef.value;
    if (!imageEle) return;

    const isZoomIn = e.deltaY < 0;

    if (isZoomIn) {
      const err = updateMousePos(e.clientX, e.clientY);
      if (err) return;

      isZoomAble.value = false;
      zoom(scale.value + factor);
    } else {
      zoom(scale.value - factor);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    drag(e.clientX, e.clientY);
  };
  const handleMouseUp = (e: MouseEvent) => {
    stopDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: TouchEvent) => {
    startDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    drag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    stopDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY, true);
  };

  watchEffect(() => {
    const imageEle = imageRef.value;

    if (imageEle) {
      currentImageSize.value.height = imageEle.clientHeight;
      currentImageSize.value.width = imageEle.clientWidth;
    }
  });

  return {
    imageRef,
    isDrag,
    isZoomAble,
    handleMouseDown,
    handleTouchStart,
    handleMouseMove,
    handleTouchMove,
    handleMouseUp,
    handleTouchEnd,
    handleWheel,
  };
}
