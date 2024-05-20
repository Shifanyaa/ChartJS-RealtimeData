<script>
	import { init, toggleMaximize, toggleMinimize, closeWindow } from './+page.js';
</script>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
			integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
			crossorigin="anonymous"
			referrerpolicy="no-referrer"
		/>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body class="bg-purple-700">
		<!-- <button
      type="button"
      onclick="openWindow();"
      class="m-6 text-white border-white border-solid border py-3 px-5 hover:bg-white hover:text-purple-700 transition-colors"
    >
      Open Window
    </button> -->

		<div
			draggable=""
			id="wrapper"
			class="absolute bottom-0 left-0 right-0 top-0 m-auto h-[420px] w-[26%] rounded-2xl bg-white"
		>
			<div
				id="header"
				class="flex cursor-move justify-between border-b border-gray-300 p-6 text-xl text-purple-700"
			>
				Draggable Window

				<div
					id="actions"
					class="flex cursor-pointer gap-3"
					onmousedown="event.stopImmediatePropagation(); event.stopPropagation(); event.preventDefault()"
				>
					<i class="fa-sharp fa-regular fa-window-maximize" onclick="toggleMaximize()"></i>
					<i class="fa-sharp fa-solid fa-minus" onclick="toggleMinimize()"></i>
					<i class="fa-sharp fa-solid fa-xmark" onclick="closeWindow()"></i>
				</div>
			</div>
			<div id="content" class="p-6 text-center">
				<div
					class="m-auto mb-4 flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-purple-700"
				>
					<i class="fa-sharp fa-solid fa-maximize text-4xl text-purple-700"></i>
				</div>
				<h2 class="mb-5 text-4xl">Draggable Window</h2>
				<p class="mb-10">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, quas blanditiis ratione,
					veniam nobis inventore qui minus nesciunt unde rerum, voluptatum error. Perspiciatis
					laborum repellat eveniet atque voluptatem ipsum cum.
				</p>
			</div>
		</div>
	</body>
</html>
