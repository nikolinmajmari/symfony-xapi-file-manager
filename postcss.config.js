module.exports = {
    plugins: {
        tailwindcss: {
            content: ["./templates/*.{html,js,twig}"],
            theme: {
                extend: {},
            },
            plugins: [],
        },
        autoprefixer: {},
    }
}