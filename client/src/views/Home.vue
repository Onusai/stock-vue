<template>
    <div class="page">
        <InputBar @sym-entered="symEntered" @input-signal="inputSignal"/>
        <QuoteDisplay v-bind:quotes="quotes" @quote-signal="quoteSignal"/>
        <NewsBar v-bind:data="newsFV" source="Finviz"/>
        <NewsBar v-bind:data="newsMW" source="MarketWatch"/>
    </div>
</template>

<script>
import InputBar from '../components/InputBar.vue';
import QuoteDisplay from '../components/QuoteDisplay.vue';
import NewsBar from '../components/NewsBar.vue';

import axios from 'axios';

export default {
    name: 'Home',
    components: {
        InputBar,
        QuoteDisplay,
        NewsBar
    },
    data() {
        return {
            quotes: {
                good: {},
                bad: {},
                maybe: {},
                staging: [{sym:"headers", newsFV:[], newsMW:[]}]
            },
            newsFV: [],
            newsMW: []
        }
    },
    methods: {
        symEntered(sym) {
            console.log("fetch " + sym);

            axios.get(`/api/quote/${sym}`)
                .then(res => {
                    let exists = false;
                    this.quotes.staging.forEach((el, i) => {
                        if (el.sym == sym) {
                            this.quotes.staging[i] = res.data;
                            exists = true;
                        }
                    });

                    if (!exists) {
                        this.quotes.staging.push(res.data);
                    }
                    this.newsFV = res.data.newsFV;
                    this.newsMW = res.data.newsMW;
                })
                .catch(() => {
                    this.text = `Invalid SYM: ${this.text}`;
                });
        },
        quoteSignal(sym, action) {
            switch (action) {
                case 'trash':
                    this.quotes.staging = this.quotes.staging.filter((value) => {
                        return value.sym != sym;
                    });
                    this.newsFV = [];
                    this.newsMW = [];
                    break;
                case 'update':
                    this.symEntered(sym)
                    break;
                case 'clicked':
                    var sym_data = this.quotes.staging.filter((value) => {
                        return value.sym == sym;
                    });

                    try {
                        this.newsFV = sym_data[0].newsFV;
                        this.newsMW = sym_data[0].newsMW;
                    } catch {
                        return
                    }
                    break;
            }
        },
        inputSignal(action) {
            switch (action) {
                case 'trash-all':
                    this.quotes.staging = [{sym:"headers", newsFV:[], newsMW:[]}];
                    this.newsFV = [];
                    this.newsMW = [];
                    break;
                case 'update-all':
                    this.quotes.staging.slice(1).forEach(el => {
                        this.symEntered(el.sym);
                    });
                    break;
            }
        },
    }
}
</script>


<style>
.page {
  width: 670px;
  height: 100%;
  display: grid;
  grid-template: min-content 1fr min-content min-content/ auto;
}

#input, textarea {
    background: #55606b;
}

</style>>
