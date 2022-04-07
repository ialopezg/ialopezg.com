import {useEffect, useRef} from 'react'

const resizeCanvas = (canvas, context) => {
    const {width, height} = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio
        canvas.height = height * ratio
        context.scale(ratio, ratio)

        return true
    }

    return false
}

const useCanvas = (draw, options = {}) =>  {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext(options.context || '2d')
        let animationFrameId

        window.addEventListener('resize', () => {
            resizeCanvas(canvas, context)
        })

        const columns = context.canvas.width / options.fontSize
        const drops = []
        for(let x = 0; x < columns; x++) {
            drops[x] = 1
        }
        options.drops = drops

        const render = () => {
            resizeCanvas(canvas, context)

            draw(context, options)

            requestAnimationFrame(render)
        }
        render()

        return () => cancelAnimationFrame(animationFrameId)
    }, [draw, options])

    return canvasRef
}

export default useCanvas;