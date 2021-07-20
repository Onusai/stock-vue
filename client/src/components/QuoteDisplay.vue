<template>
    <div id="quote-display">
        <!--
        <pre>
            {{Object.keys(quotes.staging).length}}
            {{Object.keys(quotes.good).length}}
            {{Object.keys(quotes.maybe).length}}
            {{Object.keys(quotes.bad).length}}
        </pre>
        -->
        <QuoteList v-bind:items="quotes.staging" @trash-item="trashItem"/>
    </div>
</template>


<script>
import QuoteList from "./Quote/QuoteList.vue";

export default {
    name: 'QuoteDisplay',
    components: {
        QuoteList
    },
    props: ['quotes'],
    data() {
        return {
            sym: ""
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
#quote-display {
    width: 100%;
    background-color:rgb(72, 92, 110);
    overflow-y: scroll;
    
}

#quote-display::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

#quote-display {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>

