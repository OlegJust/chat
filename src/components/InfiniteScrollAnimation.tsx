import React from 'react'

const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2']
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
      <div className='inner'>
        {children}
        {children}
      </div>
    </div>
  )
}

type Tag = {
  text: string
}
const Tag = ({ text }: Tag) => (
  <div className='tag'>
    {text}
  </div>
)

const InfiniteScrollAnimation = () => (
  <div className='infiniteScrollAnimation'>
    <div className='tag-list'>
      {[...new Array(ROWS)].map((_, i) => (
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

export default InfiniteScrollAnimation
// ReactDOM.render(<App />, document.body)