import './AtAtScene.less'

// A pure-CSS AT-AT walker crossing a moonlit ridge, adapted from a CodePen (https://codepen.io/r4ms3s/pen/gajVBG).
// The markup keeps the pen's structure because its stylesheet leans on it; the four legs and the six rock groups are
// generated since they are identical copies.

function Leg({ position }: { position: 'front' | 'rear' | 'front-back' | 'rear-back' }) {
  return (
    <div className={`leg-content leg-${position}`}>
      <div className="leg-first-joint"><i></i></div>
      <div className="leg-first">
        <i className="leg-first-hr-a"></i>
        <i className="leg-first-hr-b"></i>
        <div className="in-first-leg">
          <div className="leg-second-joint"><i></i></div>
          <div className="leg-second">
            <i className="leg-second-hr"></i>
            <div className="in-second-leg">
              <div className="foot-joint"><i className="foot-ankle"><i className="foot-ankle-bg"></i></i></div>
              <div className="foot-ankle-bottom"></div>
              <div className="foot-ankle-space"></div>
              <div className="foot">
                <div className="foot-bottom"></div>
                <div className="foot-land"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const rockClasses = [
  'rock rock-big rock-1',
  'rock rock-big rock-2',
  'rock rock-big rock-3',
  'rock rock-middle rock-7',
  'rock rock-middle rock-8',
  'rock rock-middle rock-9',
  'rock rock-middle rock-10',
  'rock rock-middle rock-11',
  'rock rock-middle rock-12',
  'rock rock-middle rock-13',
  'rock rock-middle rock-14',
]

function RockGroup({ className }: { className: string }) {
  return (
    <div className={className}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div className={`rock-content rock-content-${n}`} key={n}>
          {rockClasses.map((c) => (
            <i className={c} key={c}></i>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function AtAtScene() {
  return (
    <div className="atat-scene" aria-hidden="true">
      <div className="at-at">
        <div className="at-at-content">
          <div className="at-at-body">
            <div className="at-at-head">
              <div className="at-at-neck">
                <div className="neck-ribs">
                  <div className="neck-cable-first"></div>
                  <div className="neck-cable-second"></div>
                  <div className="neck-cable-last"></div>
                  <i></i><i></i><i></i><i></i>
                </div>
                <div className="neck-bg"></div>
              </div>
              <div className="head-bg">
                <div className="head-snout">
                  <div className="in-head-snout"></div>
                  <div className="head-snout-gun"></div>
                </div>
                <i className="head-bg-first"></i>
                <i className="head-bg-second"></i>
              </div>
              <div className="head">
                <div className="head-chin">
                  <i className="head-chin-bg-first"></i>
                  <i className="head-chin-bg-second"></i>
                  <i className="head-gun"></i>
                  <i className="fire"><i></i><i></i><i></i></i>
                </div>
              </div>
              <i className="head-left-bg"></i>
              <i className="head-top-bg"></i>
            </div>
            <div className="at-at-body-left">
              <i className="at-at-body-left-bg-1"></i>
              <i className="at-at-body-left-bg-2"></i>
              <i className="at-at-body-left-bg-3"></i>
              <i className="at-at-body-left-bg-4"></i>
              <i className="at-at-body-left-bg-5"></i>
              <div className="at-at-body-left-bg"></div>
            </div>
            <div className="at-at-body-right">
              <i className="at-at-body-right-bg-1"></i>
              <i className="at-at-body-right-bg-2"></i>
              <i className="at-at-body-right-bg-3"></i>
              <i className="at-at-body-right-bg-4"></i>
              <i className="at-at-body-right-bg-5"></i>
              <div className="at-at-body-right-bg"></div>
            </div>
            <div className="at-at-body-bottom">
              <div className="at-at-body-bottom-bg"><i></i><i></i><i></i></div>
              <div className="body-bottom-left"></div>
            </div>
            <div className="at-at-body-bg">
              <i></i><i></i><i></i><i></i>
              <div className="i"></div>
            </div>
            <div className="at-at-body-bg-first-block">
              <i className="at-at-body-bg-first-block-item-1"></i>
              <i className="at-at-body-bg-first-block-item-2"></i>
              <i className="at-at-body-bg-first-block-item-3"></i>
            </div>
            <div className="at-at-body-bg-second-block">
              <i className="at-at-body-bg-second-block-item-1"></i>
              <i className="at-at-body-bg-second-block-item-2"></i>
            </div>
            <div className="at-at-body-bg-third-block">
              <i className="at-at-body-bg-third-block-item-1"></i>
              <i className="at-at-body-bg-third-block-item-2"></i>
              <i className="at-at-body-bg-third-block-item-3"></i>
            </div>
          </div>
          <div className="dark-bg">
            <i className="dark-bg-right"></i>
          </div>
        </div>
        <Leg position="front" />
        <Leg position="rear" />
        <Leg position="front-back" />
        <Leg position="rear-back" />
      </div>

      <i className="moon"></i>
      <i className="mountain-first">
        <i className="mountain-shadow"></i>
      </i>
      <i className="mountain-second">
        <i className="mountain-shadow"></i>
        <span className="mountain-top"></span>
      </i>
      <div className="first-bg">
        <div className="first-bg-anim">
          <i className="first"></i>
          <i className="second"></i>
          <i className="third"></i>
          <i className="last"></i>
        </div>
        <div className="second-bg-anim">
          <RockGroup className="first-rock-content" />
          <RockGroup className="second-rock-content" />
        </div>
      </div>

      <div className="space-ship space-ship-small">
        <i className="space-ship-wing"></i>
        <i className="space-ship-bg"><i className="space-ship-gun"></i></i>
      </div>
      <div className="space-ship space-ship-big">
        <i className="space-ship-wing"></i>
        <i className="space-ship-bg"><i className="space-ship-gun"></i></i>
      </div>
    </div>
  )
}
