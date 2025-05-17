<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import Loading from "../../components/Loading.vue";
import Table from "../../components/Table.vue";
import useProduct from "./useProduct";
import Tab from "./Tab.vue";
import Frame from "./Frame.vue";
import NotFound from "./NotFound.vue";

const { products, isFetching, fetchProduct, value, tabs, tab } = useProduct();
</script>

<template>
  <SearchBar
    :submit="
      () =>
        fetchProduct({
          variant: 'search',
        })
    "
    v-model="value"
  />

  <div :class="`mt-5 ${tab === 'All' ? 'disable' : ''}`">
    <Tab :tabs="tabs" :tab="tab" :setTab="(t) => (tab = t)" />
  </div>

  <div class="w-[500px] max-w-[80vw] mt-2">
    <div className="mt-3">
      <Loading v-if="isFetching" />

      <Frame class="h-[200px] overflow-auto" v-else-if="!!products.length">
        <Table :colList="['Name', '']">
          <tr v-for="p in products">
            <td>
              {{ p.product_name }}
            </td>
            <td></td>
          </tr>
        </Table>
      </Frame>

      <NotFound v-else />
    </div>
  </div>
</template>
