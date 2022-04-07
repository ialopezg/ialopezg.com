import React from 'react';

import Canvas from './components/Canvas/Canvas'

function App() {
    const getCharset = () => {
        return Array.apply(null, Array(127 - 32))
            .map((x, i) => {
                return String.fromCharCode(i + 32)
            })
    }

    const drawMatrix = (context, options= {}) => {
        context.fillStyle = "rgba(0, 0, 0, 0.04)"
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        // green text
        context.fillStyle = '#28a745'
        context.font = options.fontSize + 'px arial'

        // looping over drops
        for(let i = 0; i < options.drops.length; i++) {
            let text = options.letters[Math.floor(Math.random() * options.letters.length)]
            context.fillText(text, i * options.fontSize, options.drops[i] * options.fontSize)

            if(options.drops[i] * options.fontSize > context.canvas.height && Math.random() > 0.975) {
                options.drops[i] = 0
            }

            options.drops[i]++
        }
    }

    const onClickHandler = () => {
      console.log('Clicked')
    }

    const charset = getCharset()
    return (
        <>
            <Canvas className="canvas" width={window.innerWidth} height={window.innerHeight} options={{
                letters: charset,
                fontSize: 14
            }} draw={drawMatrix}/>
            <div className="container">
                <div className="content">
                    <img id="cspio-logo" src="logo512.png" width="256" alt="IALopezG Website"/>

                        <h1 id="cspio-headline">Coming Soon</h1>

                        <div id="cspio-description">Get ready! Something really cool is coming!</div>

                        <form name="subscriber-form" action="index.php" method="post">
                            <div id="cspio-field-wrapper">
                                <div className="row">
                                    <div className="col-md-12 seperate">
                                        <div className="input-group">
                                            <input id="cspio-email" name="email_subscriber"
                                                   className="form-control input-lg form-el" type="email"
                                                   placeholder="Email" required/>
                                            <span className="input-group-btn">
                                    <button id="cspio-subscribe-btn" type="submit"
                                            className="btn btn-lg btn-primary form-el noglow" onClick={onClickHandler}>Notify Me</button>
                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <span id="cspio-privacy-policy-txt">We promise to never spam you.</span>

                        <div id="cspio-socialprofiles">
                            <a href="https://linkedin.com/in/ialopezg" target="_blank" rel="noopener noreferrer"><i
                                className="fa fa-linkedin fa-2x"></i></a>
                            <a href="https://facebook.com/isidroalopezg" target="_blank" rel="noopener noreferrer"><i
                                className="fa fa-facebook-official fa-2x"></i></a>
                            <a href="https://twitter.com/isidrolopezg" target="_blank" rel="noopener noreferrer"><i
                                className="fa fa-twitter fa-2x"></i></a>
                            <a href="mailto:me@ialopezg.com" target="_blank" rel="noopener noreferrer"><i
                                className="fa fa-envelope fa-2x"></i></a>
                        </div>

                        <div id="cspio-credit">
                            <span style={ { fontSize: 16 } }>
                                IALopezG &copy; {new Date().getFullYear()}.
                            </span>
                        </div>
                </div>
            </div>
        </>
      )
}

export default App;
