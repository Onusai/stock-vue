<template>
    <div class="page">
        <InputBar @sym-entered="symEntered"/>
        <QuoteDisplay v-bind:quotes="quotes" @trash-item="trashItem" />
        <NewsBar v-bind:data="news" />
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
                staging: []
            },
            news: []
        }
    },
    methods: {
        symEntered(sym) {
            console.log(sym);

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
                    this.news = res.data.news;
                })
                .catch(() => {
                    this.text = `Invalid SYM: ${this.text}`;
                });
        },
        trashItem(sym) {
            console.log('here' + sym);
            this.quotes.staging = this.quotes.staging.filter((value) => {
                return value.sym != sym;
            });
        }
    }
}
</script>


<style>
.page {
  width: 670px;
  height: 100%;
  display: grid;
  grid-template: min-content 1fr min-content / auto;
}

#input, textarea {
    background: #55606b;
}
</style>>
