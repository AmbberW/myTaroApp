<template><view></view></template>
<script>
var timer = null;
export default {
    methods: {
        debounce(fn, wait, ...args) {
            if (timer) {
                clearTimeout(timer);
            } else {
                timer = setTimeout(() => {
                    fn(...args);
                }, wait);
            }
        },
    },
};
</script>