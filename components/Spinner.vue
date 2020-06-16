<template>
  <div class="spinner" />
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  @-webkit-keyframes spinner {
    from  { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @-moz-keyframes spinner {
    from  { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @-o-keyframes spinner {
    from  { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes spinner {
    from  { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .spinner {
    position: relative;

    input {
      pointer-events: none;
      user-select: none;
    }

    &::before {
      position: absolute;
      content: '';
      top: -0;
      left: -0;
      background: rgba(255, 255, 255, 0.8);
      width: 100%;
      height: 100%;
      z-index: 100;
    }

    &::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      margin: -1.5rem;
      width: 3rem;
      height: 3rem;
      animation: spinner 0.6s linear;
      animation-iteration-count: infinite;
      border-radius: 50%;
      border-color: #fff rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
        rgba(0, 0, 0, 0.1);
      border-style: solid;
      border-width: 0.2em;
      box-shadow: 0px 0px 0px 1px transparent;
      visibility: visible;
      z-index: 101;
    }
  }
</style>