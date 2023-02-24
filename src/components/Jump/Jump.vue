<template>
  <div></div>
</template>

<script>
export default {
  name: 'MyJump',
  created() {
    this.jump()
  },
  methods: {
    jump() {
      this.$router.push({
        path: this.$route.query.path
      })
    }
  }
}
</script>

<style>

</style>
