<template>
	<div>
		<div
			:class="{ fullscreen: fullscreen }"
			class="tinymce-container"
			ref="tinymceContainer"
		>
			<textarea
				:id="tinymceId"
				class="tinymce-textarea"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import common from "@/api/modules/common";
import load from "@/utils/dynamicLoadScript";
import { ElMessage } from "element-plus";
import { dayjs } from "element-plus";

interface Props {
	modelValue: string;
	imageLimit?: number;
	contentLimit?: number;
}

const props = withDefaults(defineProps<Props>(), {
	contentLimit: 2000,
	imageLimit: 30
});
const tinymceContainer = ref(null);
const emits = defineEmits(["update:modelValue"]);
const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""));
const fullscreen = ref(false);
const toolbar = [
	"fontsize searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
	"hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen help"
];
const plugins =
	"advlist anchor autolink autoresize charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table wordcount wordlimit";
const tinymceCDN = window.location.origin + window.location.pathname + "tinymce/tinymce.min.js";
// const tinymceCDN = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js'
onMounted(() => {
	init();
});

const init = () => {
	load(tinymceCDN, (err: any) => {
		if (err) {
			console.error(err.message);
			ElMessage.error("编辑器加载失败，请刷新页面");
			return;
		}
		window.tinymce.baseURL = window.location.origin + window.location.pathname + "tinymce";
		initTinymce();
	});
};
const initTinymce = () => {
	window.tinymce.init({
		placeholder: `文字输入不超过${props.contentLimit}字，图片不超过${props.imageLimit}张`, // placeholder
		language: "zh-Hans", // 语言
		selector: `#${tinymceId.value}`, // dom选择器
		min_height: 500, // 最小高度
		max_height: 500, // 最大高度
		resize: true, // 是否能拖动改变文本域大小
		toolbar: toolbar, // 工具栏配置
		plugins: plugins, // 插件
		content_style: "img {max-width:100%;}", // 内容样式
		menubar: false, // 是否展示菜单栏
		branding: false, // 隐藏 tiny logo
		body_class: "editor-body ", // 自定义bodyclass
		end_container_on_empty_block: true, // 如果在空的内部块元素中按enter键，则此选项允许您拆分当前容器块元素。
		powerpaste_word_import: "clean", // 此设置控制如何筛选从Microsoft Word粘贴的内容
		advlist_bullet_styles: "square", // 此选项允许您在默认bullist工具栏控件中包含特定的无序列表项标记 默认值：default,circle,disc,square
		advlist_number_styles: "default", // 此选项允许您在默认的numlist工具栏控件中包含特定的有序列表项标记,默认值：default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman
		default_link_target: "_blank", // 链接默认打开方式
		wordlimit: { max: props.contentLimit || undefined },
		link_title: false, // 是否允许禁用链接对话框中的链接标题输入字段
		nonbreaking_force_tab: true, // 此选项允许您在用户按下键盘tab键时强制TinyMCE插入三个实体
		setup: function (editor) {
			editor.on("change", function () {
				const value = editor.getContent();
				emits("update:modelValue", value);
			});
		},
		images_upload_handler(blobInfo: any) {
			return new Promise((resolve, reject) => {
				if (!checkImgCount()) {
					reject({
						message: "图片数量超出限制",
						remove: true
					});
					return;
				}
				const file = blobInfo.blob();
				if (file.size > 1024 * 1024 * 10) {
					reject({
						message: "图片大小超出限制",
						remove: true
					});
					return;
				}
				const key = `sendmall/spu_richtext_pic/${dayjs().format(
					"YYYYMMDD"
				)}/pic_${dayjs().valueOf()}_${blobInfo.filename()}`;
				common.uploadImageGetFullUrl(key, { file }).then(res => {
					if (res.errcode == 0) {
						resolve(res.msg[0]);
					} else {
						reject({
							message: "Image upload failed.",
							remove: true
						});
					}
				});
			});
		},
		// 初始化编辑器实例时要执行的函数
		init_instance_callback: (editor: any) => {
			if (props.modelValue && editor) {
				editor.setContent(props.modelValue);
			}
		}
	});
};

const checkImgCount = (): boolean => {
	if (
		window.tinymce?.get(tinymceId.value).dom.doc.querySelectorAll("img").length >=
		props.imageLimit + 1
	) {
		return false;
	}
	return true;
};

const destroyTinymce = () => {
	const tinymce = window.tinymce?.get(tinymceId.value);

	if (tinymce) {
		tinymce.destroy();
	}
};
onActivated(() => {
	if (window.tinymce) {
		initTinymce();
	}
});

onDeactivated(() => {
	destroyTinymce();
});

onUnmounted(() => {
	destroyTinymce();
});
</script>
