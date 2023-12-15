<template>
	<FullPage class="text-white">
		<div class="flex-1 px-50px flex flex-col gap-30px">
			<Typed :options="options">
				<h1 class="typing"></h1>
			</Typed>
		</div>
		<div class="flex-1"><v-btn @click="showDialog = true">View More</v-btn></div>

		<v-dialog
			width="500"
			v-model="showDialog"
		>
			<v-card>
				<v-card-text>More modules are under development, so stay tuned</v-card-text>
				<v-card-actions>
					<v-btn
						color="primary"
						block
						@click="showDialog = false"
					>
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</FullPage>
</template>

<script setup lang="ts">
import FullPage from "@/layout/FullPage/FullPage.vue";
import { ref } from "vue";
import { Typed, TypedOptions } from "@duskmoon/vue3-typed-js";

const options: TypedOptions = {
	strings: [
		`<h1 class="text-60px">Hello</h1>
			<h3 class="text-30px">My name is Spike Lee.</h3>
			<div class="h-20px"></div>
			<p class="typed-strings text-18px">
				I am a software developer currently based in Chengdu, specializing in front-end
				development. I have extensive experience in developing web projects, app projects,
				and mini-program projects. I possess strong proficiency in both the Vue ecosystem
				and the React ecosystem. Furthermore, I have a solid understanding of backend
				development.
			</p>
			<div class="h-20px"></div>
			<p class="typed-strings text-18px">
				You can find some of my code on my GitHub profile, although it may not be extensive
				as I am usually occupied with work commitments. Presently, I hold the position of a
				senior front-end development engineer at a company. Alongside development
				responsibilities, I possess valuable experience in team management, mentoring new
				talent, and facilitating technology sharing initiatives.
			</p>
			<div class="h-20px"></div>
			<p class="typed-strings text-18px">
				Outside of work, my Chinese name is 李龙, and I actively embrace life's pleasures. I
				find enjoyment in playing computer games, with Dota 2 being my favorite.
				Additionally, I frequently explore new and intriguing games on Steam. When I venture
				outdoors, I engage in activities such as playing tennis or embarking on camping
				adventures.
			</p>`
	],
	typeSpeed: 30
};
const showDialog = ref(false);
</script>
