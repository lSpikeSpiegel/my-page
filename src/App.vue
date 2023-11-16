<script setup lang="ts">
onBeforeMount(() => {
	const url = location.href;
	if (process.env.NODE_ENV === "production" && !url.startsWith("https://")) {
		// 限制只能通过https访问
		location.replace(url.replace("http://", "https://"));
	}
});
</script>

<template>
	<router-view></router-view>
</template>

<style lang="scss"></style>
