import React, { useState, useEffect, useRef, RefObject } from 'react'

const TAGS: string[] = [
  'Hello',
  'Bye',
  'Сongrats!',
  'WTF?!?!',
  '...writes',
  'NOOOOO!!!!',
  'Yes)',
  'Why?',
  '😅',
  '🙃',
  '❤',
  '😂',
]
const DURATION = 15000
const ROWS = 13
const TAGS_PER_ROW = 6

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
const shuffle = (arr: string[]) => [...arr].sort(() => 0.5 - Math.random())

interface InfiniteLoopSlider {
  children?: JSX.Element | JSX.Element[]
  duration: number
  reverse: boolean | number
}
function InfiniteLoopSlider(props: InfiniteLoopSlider) {
  const { children, duration, reverse = false } = props

  const divStyle = {
    color: 'red', // doesn't work without color
    '--duration': `${duration}ms`,
    '--direction': reverse ? 'reverse' : 'normal',
  }
  return (
    <div className='loop-slider' style={divStyle}>
      <div className=' animate-loop-rer inner'>
        {children}
        {children}
      </div>
    </div>
  )
}

type Tag = {
  text: string
}
const Tag = ({ text }: Tag) => <div className='tag'>{text}</div>

function InfiniteScrollAnimation() {
  const [div1Height, setDiv1Height] = useState<number>(0)
  const div1Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (div1Ref && div1Ref.current) {
      setDiv1Height(div1Ref.current.offsetHeight)
      const handleResize = () => {
        if (div1Ref && div1Ref.current) {
          setDiv1Height(div1Ref.current.offsetHeight)
        }
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [div1Ref])

  console.log(div1Height)

  return (
    <div ref={div1Ref as RefObject<HTMLDivElement>} className='infiniteScrollAnimation'>
      <div className='tag-list '>
        {[...new Array(div1Height === 0 ? ROWS : Math.floor(div1Height / 52) - 1)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2}
          >
            {shuffle(TAGS)
              .slice(0, TAGS_PER_ROW)
              .map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
          </InfiniteLoopSlider>
        ))}
        <div className='fade' />
      </div>
    </div>
  )
}

export default InfiniteScrollAnimation
// ReactDOM.render(<App />, document.body)
