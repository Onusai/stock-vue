<template>
    <div id="quote-list">
        <QuoteItem v-for="item in items" :key="item.sym" v-bind:data="item" @trash-item="trashItem"/>
    </div>
</template>


<script>
import QuoteItem from "./QuoteItem.vue";

export default {
    name: "QuoteList",
    components: {
        QuoteItem
    },
    props: ["items"],
    data() {
        return {
            
        }
    },
    methods: {
        trashItem(sym) {
            this.$emit('trash-item', sym);
        }
    }
}
</script>


<style scoped>
#quote-list {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>