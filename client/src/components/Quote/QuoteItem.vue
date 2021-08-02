<template>
    <div id="quote-item" @click="quoteClicked">
        <ValueCell v-for="cell in cells" :key="cell.id" v-bind:data="cell"/>
        <div class="buttons" ref="buttons">
            <button type="button" @click="openFV">F</button>
            <button type="button" @click="openMW">M</button>
            <button type="button" @click="update">U</button>
            <button type="button" @click="trash">D</button>
        </div>
        
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
            if (this.data.sym == "headers") {
                this.cells = [];
                let color = 'h';
                this.cells.push({id:'sym', value:"Symbol", color});
                this.cells.push({id: 'value', value:"Price", color});
                this.cells.push({id: 'relVol', value:"Rel Vol", color});
                this.cells.push({id: 'float', value:"Float", color});
                this.cells.push({id: 'chgp', value:"Chg %", color});
                this.cells.push({id: 'avgVol', value:"Avg Vol", color});
                this.cells.push({id: 'shortInt', value:"Short %", color});
                return;
            }

            /* sym, price, relVol, float, chgP, avgVol, fpShorted | url, news */
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
            let floatShort = this.data.float.short;
            color = 'w'
            if (float == null) {
                floatShort = "N/A";
                color = 'r';
            } else if (float < 10000000) {
                color = 'g';
            } else if (float < 20000000) {
                color = 'yg';
            } else if (float < 100000000) {
                color = 'y';
            } else {
                color = 'r';
            }
            this.cells.push({id: 'float', value:floatShort, color});

            // chg %
            let chgp = this.data.chgp;
            color = 'w'
            if (chgp < 0) {
                color = 'r';
            } else if (chgp >= 40) {
                color = 'g';
            } else {
                color = 'y';
            }
            this.cells.push({id: 'chgp', value:`${this.data.chgp}%`, color});

            // avg vol
            let avgVol = this.data.avgVol.short;
            this.cells.push({id: 'avgVol', value:avgVol, color:'w'});

            // short %
            let shortInt = this.data.fpShorted;
            if (shortInt == null) {
                shortInt = "N/A";
            }
            this.cells.push({id: 'shortInt', value:shortInt, color:'w'});
        },
        trash() {
            this.$emit('quote-signal', this.data.sym, 'trash');
        },
        update() {
            this.$emit('quote-signal', this.data.sym, 'update')
        },
        quoteClicked() {
            this.$emit('quote-signal', this.data.sym, 'clicked')
        },
        openFV() {
            window.open(`https://finviz.com/quote.ashx?t=${this.data.sym}`, "_blank");	
        },
        openMW() {
            window.open(`https://www.marketwatch.com/investing/stock/${this.data.sym}`, "_blank");	
        }
    },
    mounted() {
        if (this.data.sym == "headers") {
            let children = this.$refs.buttons.children;
            for (var i = 0; i < children.length; i++) {
                children[i].disabled = true;
                children[i].classList.add("disabled")
            }
        }
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
    align-items: center;
    color: white;
}

button {
    background-color: rgba(0, 0, 0, 0.199);
    border: rgb(87, 87, 87) 1px solid;
    color: rgb(170, 170, 170);
    border-radius: 5px;
    margin-left: 2px;
}

button:hover {
    color: rgb(255, 255, 255);
}

.disabled {
    opacity: 0%;
}
</style>