<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="sendVal"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
    data() {
        return {
            
        }
    },
    mounted() {
        mui('.mui-numbox').numbox()
    },
    methods: {
        sendVal(){
            this.$emit('getNumVal',parseInt(this.$refs.numbox.value))
        }
    },
};
</script>

<style lang="scss" scoped>
</style>