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
	<div class="w-screen h-screen overflow-hidden box-border">
		<router-view></router-view>
		<div className="fixed bottom-0 w-full text-center">蜀ICP备2023030071号</div>
	</div>
</template>

<style lang="scss"></style>
