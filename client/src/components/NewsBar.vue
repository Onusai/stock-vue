<template>
    <div id="news-bar">
        <div id="news-item" v-for="i in data" :key="i.sym">
            {{ parseDate(i.timestamp) }} | <a :href="i.link">{{ i.headline }} </a>
        </div>
    </div>
</template>


<script>
var units = {
  year  : 24 * 60 * 60 * 1000 * 365,
  month : 24 * 60 * 60 * 1000 * 365/12,
  day   : 24 * 60 * 60 * 1000,
  hour  : 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export default {
    name: 'NewsBar',
    props: ["data"],
    data() {
        return {
            sym: ""
        }
    },
    methods: {
        parseDate(timestamp) {
            return this.getRelativeTime(new Date(timestamp), new Date());
        },
        getRelativeTime(d1, d2 = new Date()) {
            var elapsed = d1 - d2

            for (var u in units) 
                if (Math.abs(elapsed) > units[u] || u == 'second') 
                    return rtf.format(Math.round(elapsed/units[u]), u)
        }
    }
}
</script>


<style scoped>
#news-bar {
    width: 100%;
    height: 180px;
    background-color:rgb(55, 69, 83);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    text-align: left !important;
    color: white !important;
}

#news-bar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

#news-bar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

#news-item {
    margin-bottom: 5px;
}

a {
    color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>

