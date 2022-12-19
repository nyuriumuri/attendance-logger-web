<script>
    import "../app.css";
</script>

<div class="flex flex-col min-h-screen  bg-gray-900">
  <div class="flex flex-row gap-3 m-4">
    <a href="/" class="text-white hover:text-blue-400">Home</a>
    <a href="/students"class="text-white hover:text-blue-400">Students</a>
  </div>

  <slot />
</div>