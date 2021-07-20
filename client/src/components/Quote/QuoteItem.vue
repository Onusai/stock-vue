<template>
    <div id="quote-item">
        <ValueCell v-for="cell in cells" :key="cell.id" v-bind:data="cell"/>
        <button id="delete-btn" type="button" @click="update">U</button>
        <button id="delete-btn" type="button" @click="trash">D</button>
    </div>
</template>


<script>
import ValueCell from "./ValueCell.vue";

export default {
    name: "QuoteItem",
    components: {
        ValueCell
    },
    props: ["data"],
    data() {
        return {
            cells: []
        }
    },
    methods: {
        processData() {
            /* sym, price, float, avgVol, relVol, fpShorted, url, news */
            this.cells = [];
            
            // sym
            this.cells.push({id:'sym', value:this.data.sym.toUpperCase(), color:'w'});

            // price
            let price = this.data.price;
            let color = 'w';
            if (price < 1.5) {
                color = 'r';
            } else if (price < 10) {
                color = 'g';
            } else if (price < 20) {
                color = 'y';
            } else {
                color = 'r';
            }
            this.cells.push({id: 'value', value:price, color});

            // rel vol
            let relVol = this.data.relVol;
            if (relVol < 10) {
                relVol = Math.round(relVol * 10) / 10;
            } else {
                relVol = Math.round(relVol);
            }
            
            color = 'w'
            if (relVol < 1) {
                color = 'r';
            } else if (relVol < 2) {
                color = 'y';
            } else {
                color = 'g';
            }
            this.cells.push({id: 'relVol', value:relVol+'x', color});

            // float
            let float = this.data.float.real;
            color = 'w'
            if (float < 10000000) {
                color = 'g';
            } else if (float < 20000000) {
                color = 'yg';
            } else if (float < 100000000) {
                color = 'y';
            } else {
                color = 'r';
            }
            this.cells.push({id: 'float', value:this.data.float.short, color});

            // avg vol
            let avgVol = this.data.avgVol.short;
            this.cells.push({id: 'avgVol', value:avgVol, color:'w'});

            // short %
            let shortInt = this.data.fpShorted;
            this.cells.push({id: 'shortInt', value:shortInt, color:'w'});
        },
        trash() {
            this.$emit('trash-item', this.data.sym);
        },
        update() {

        }
    },
    mounted() {
        this.processData()
    },
    watch: {
        data() {
            this.processData();
        }
    }
}
</script>


<style scoped>
#quote-item {
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.199);
    display: flex;
    justify-content: space-between;
    color: white;
}

#delete-btn {
    background-color: rgba(0, 0, 0, 0.199);
    border: rgb(87, 87, 87) 1px solid;
    color: red;
}
</style>