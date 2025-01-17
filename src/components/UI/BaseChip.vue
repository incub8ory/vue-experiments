<template>
    <span class='chip'>
        <slot>Tag name</slot>
    </span>
</template>

<style scoped>
.chip {
    font-size: 12px;
    padding: 2px 4px;
    border: 1px solid var(--color-border);
    display: inline-block;
    border-radius: 3px;
    background-color: var(--color-background-mute);
}
</style>