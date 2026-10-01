import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function random(min: number, max?: number) {
  if (max === undefined) { max = min; min = 0; }
  return Math.random() * (max - min) + min;
}

function chanceRoll(chance: number) {
  return chance > 0 && Math.random() * 100 <= chance;
}

export default function BB8() {
  const svgRef = useRef<SVGSVGElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!svgRef.current || initialized.current) return;
    initialized.current = true;

    const svg = svgRef.current;
    const gravelGroup = svg.querySelector('[data-bb8=gravelGroup]') as SVGElement;
    const gravel = svg.querySelectorAll('[data-bb8=gravel]') as NodeListOf<SVGElement>;
    const largeMask = svg.querySelector('[data-bb8=largeMask]') as SVGElement;

    const animElems = ['bb8', 'unit', 'bodyShadow', 'bodySurface', 'rotatingHead', 'headShadowBig', 'headShadowSmall', 'bouncingHead', 'antennaLong', 'antennaShort', 'headSurface', 'upperLight', 'lowerLight', 'littleEye', 'bigEye', 'eyeHighlight', 'pupilGroup', 'pupil1', 'pupil2', 'pupil3', 'pupil4'];

    const bb8: Record<string, SVGElement | null> = {};
    for (const name of animElems) {
      bb8[name] = svg.querySelector(`[data-bb8=${name}]`);
    }

    // State
    let isIntro = true;
    let isRollingLeft = false;
    let currentTl: gsap.core.Timeline[] = [];
    let gravelProgress: number[] = [];
    let prevGravelProgress: number[] = [];
    let slowMoFactor = 1;
    let slowMoFactorBody = 0.25;
    const lightsOnOff = [0, 0];
    let wiggleFrame = 0;
    let allTheTime = 0;
    const headNull = { value: 0 };

    // Head parallax constants
    const headSurfaceCenter = -50;
    const bigEyeCenter = 217 + headSurfaceCenter;
    const littleEyeCenter = 385 + headSurfaceCenter;
    const antennaShortCenter = -50;
    const antennaLongCenter = -50;
    const pupilGroupCenter = 20;
    const eyeHighlightCenter = 10;

    function setStart() {
      gsap.set(svg, { autoAlpha: 1 });
      gsap.set(largeMask, { scale: 1, transformOrigin: 'center' });
      gsap.set(bb8.bb8, { y: 500, x: 500, scale: 1.05, transformOrigin: 'center bottom' });
      gsap.set(bb8.rotatingHead, { rotation: 0, transformOrigin: 'center' });
      spreadGravel();
    }

    function spreadGravel() {
      gsap.set(gravelGroup, { x: -50 });
      for (let i = 0; i < gravel.length; i++) {
        gsap.set(gravel[i], { x: 0, y: random(100, 800) });
      }
      getGravelAnims('right');
    }

    function getGravelAnims(direction: string) {
      const tls: gsap.core.Timeline[] = [];
      for (let i = 0; i < gravel.length; i++) {
        const speed = 0.5;
        const fromX = direction === 'left' ? 0 : 2935;
        const toX = direction === 'left' ? 2935 : 0;

        if (prevGravelProgress.length !== gravel.length) {
          gravelProgress[i] = random(0, 1);
          prevGravelProgress[i] = gravelProgress[i];
        } else {
          gravelProgress[i] = 1 - prevGravelProgress[i];
        }

        const tl = gsap.timeline({ repeat: 2000 });
        tl.fromTo(gravel[i], { x: fromX }, { x: toX, duration: speed, ease: 'none' })
          .progress(gravelProgress[i])
          .pause();
        tls[i] = tl;
      }
      return tls;
    }

    function getRollAnims(direction: string) {
      const tls = getGravelAnims(direction);
      const spinDir = direction === 'left' ? '-=360' : '+=360';
      const tl = gsap.timeline({});

      tl.to(bb8.bodySurface, { rotation: spinDir, transformOrigin: 'center', ease: 'none', duration: 0.5, repeat: 1000 }, 0)
        .to(bb8.bb8, { x: 500, duration: 2, ease: 'back.out(1.7)' }, 0)
        .to(bb8.bb8, { y: 500, scale: 1.05, transformOrigin: 'center bottom', duration: 1, ease: 'power1.inOut' }, 0)
        .to(bb8.bodySurface, { y: -400, duration: 1, ease: 'power1.inOut' }, 0)
        .to(bb8.bodySurface, { x: -600, duration: 2, ease: 'power1.inOut' }, 0)
        .to(bb8.unit, { y: 0, duration: 0.05, ease: 'power1.inOut' }, 0)
        .to(bb8.bouncingHead, { y: 0, duration: 0.05, ease: 'power1.inOut' }, 0)
        .to(bb8.bodyShadow, { scale: 1, transformOrigin: 'center', duration: 0.05, ease: 'power1.inOut' }, 0)
        .to(bb8.bb8, { x: '-=300', duration: 5, ease: 'power1.inOut', repeat: 500, yoyo: true }, 2)
        .to(bb8.bb8, { y: '-=100', scale: 1, transformOrigin: 'center bottom', duration: 0.5, ease: 'power1.inOut', repeat: 1000, yoyo: true }, 1)
        .to(bb8.bodySurface, { y: '-=250', duration: 0.5, ease: 'power1.inOut', repeat: 1000, yoyo: true }, 1)
        .to(bb8.bodySurface, { x: '+=200', duration: 5, ease: 'power1.inOut', repeat: 500, yoyo: true }, 2)
        .to(bb8.unit, { y: '-=20', duration: 0.05, ease: 'power1.inOut', repeat: 20000, yoyo: true }, 0.05)
        .to(bb8.bodyShadow, { scale: 1.03, transformOrigin: 'center', duration: 0.05, ease: 'power1.inOut', repeat: 20000, yoyo: true }, 0.05)
        .to(bb8.bouncingHead, { y: '-=30', duration: 0.05, ease: 'power1.inOut', repeat: 20000, yoyo: true }, 0.08)
        .to(bb8.rotatingHead, { duration: 10, ease: 'none', repeat: 100, motionPath: { path: [{ rotation: -20 }, { rotation: 10 }, { rotation: 0 }] } }, 0);

      tls[tls.length] = tl;
      return tls;
    }

    function getIntroAnim() {
      const tl = gsap.timeline();

      tl.to(largeMask, { scale: 0.95, duration: 1.5, ease: 'back.inOut(1)' })
        .addLabel('bb8-in')
        .to(bb8.bb8, { x: 2000, y: 4300, scale: 3, duration: 4.5, ease: 'elastic.out(10,0.3)' }, 'bb8-in')
        .to(bb8.bodySurface, { rotation: -30, transformOrigin: 'center', duration: 4.5, ease: 'elastic.out(10,0.3)' }, 'bb8-in')
        .to(bb8.rotatingHead, { rotation: -20, transformOrigin: 'center', duration: 0.1 }, 'bb8-in+=0.3')
        .to(bb8.rotatingHead, { rotation: 20, transformOrigin: 'center', duration: 0.1 }, 'bb8-in+=1')
        .to(bb8.rotatingHead, { rotation: -15, transformOrigin: 'center', duration: 3, ease: 'elastic.out(0.5,0.3)' }, 'bb8-in+=1.5')
        .to(bb8.bouncingHead, { y: '-=10', duration: 0.2, ease: 'power3.inOut', repeat: 2, yoyo: true, repeatDelay: 0.4 }, 'bb8-in+=1')
        .to(bb8.bouncingHead, { y: '+=15', duration: 0.35, ease: 'power1.inOut', repeat: 2, yoyo: true, repeatDelay: 0.2 }, 'bb8-in+=2.4')
        .to(bb8.bouncingHead, { y: '-=5', duration: 0.275, repeat: 1, yoyo: true, repeatDelay: 0.1, ease: 'power4.inOut' }, 'bb8-in+=3.85')
        .addLabel('bb8-distress')
        .to([bb8.pupil1, bb8.pupil2, bb8.pupil3, bb8.pupil4], { scale: 1.5, transformOrigin: 'center', duration: 0.2, repeat: 3, yoyo: true, stagger: 0.1 }, 'bb8-in+=2.5')
        .addLabel('bb8-out')
        .to(bb8.bb8, { x: 4500, duration: 1, ease: 'back.in(2)' }, 'bb8-out')
        .to(bb8.bodySurface, { rotation: 30, duration: 1, ease: 'back.in(2)' }, 'bb8-out')
        .to(bb8.rotatingHead, { rotation: -30, transformOrigin: 'center', duration: 1.2, ease: 'back.inOut(2)' }, 'bb8-out')
        .set(bb8.bb8, { y: 600, scale: 1, transformOrigin: 'center bottom' })
        .set(bb8.rotatingHead, { rotation: 0, transformOrigin: 'center' })
        .call(() => animate());

      return tl;
    }

    function connectHeadToNull() {
      const val = headNull.value;
      const headSurfacePos = val * 150;
      const bigEyePos = val * 150;
      const pupilGroupPos = val * 20;
      const eyeHighlightPos = val * 10;
      const littleEyePos = val * 150;
      const antennaShortPos = -val * 120;
      const antennaLongPos = -val * 70;

      gsap.set(bb8.headSurface, { x: headSurfaceCenter + headSurfacePos });
      gsap.set(bb8.bigEye, { x: bigEyeCenter + bigEyePos });
      gsap.set(bb8.pupilGroup, { x: pupilGroupCenter + pupilGroupPos });
      gsap.set(bb8.eyeHighlight, { x: eyeHighlightCenter + eyeHighlightPos });
      gsap.set(bb8.littleEye, { x: littleEyeCenter + littleEyePos });
      gsap.set(bb8.antennaShort, { x: antennaShortCenter + antennaShortPos });
      gsap.set(bb8.antennaLong, { x: antennaLongCenter + antennaLongPos });
    }

    function wiggleHead() {
      if (wiggleFrame === allTheTime) {
        allTheTime = Math.floor(random(15, 30) / slowMoFactor);
        const ranDur = allTheTime / 60;
        const ranPos = random(0.05, 0.3);
        const nowAndThen = chanceRoll(50);
        const moveAmount = random(-1, 1);

        if (nowAndThen) {
          gsap.to(headNull, { value: moveAmount, duration: ranDur, ease: 'power3.inOut' });
        } else {
          gsap.to(headNull, { value: `+=${ranPos}`, duration: ranDur / 2, ease: 'power2.inOut', repeat: 1, yoyo: true });
        }
        wiggleFrame = 0;
      }
      wiggleFrame++;
    }

    function blinkLights() {
      if (chanceRoll(10 * slowMoFactor)) {
        for (let i = 0; i < 2; i++) {
          lightsOnOff[i] = chanceRoll(50) ? 1 : 0;
        }
      }
      gsap.set(bb8.upperLight, { autoAlpha: lightsOnOff[0] });
      gsap.set(bb8.lowerLight, { autoAlpha: lightsOnOff[1] });
    }

    function bindEvents() {
      if (!bb8.bb8) return;
      bb8.bb8.addEventListener('mouseover', () => slowMotion(1));
      bb8.bb8.addEventListener('mouseout', () => slowMotion(0));
    }

    function slowMotion(val: number) {
      if (val === 1) {
        slowMoFactor = 0.1;
        slowMoFactorBody = 0.05;
      } else {
        wiggleFrame = 0;
        allTheTime = 0;
        slowMoFactor = 1;
        slowMoFactorBody = 0.25;
      }
      for (const tl of currentTl) {
        gsap.to(tl, { timeScale: slowMoFactorBody, duration: 0.1 });
      }
    }

    function recordProgress() {
      for (let i = 0; i < gravel.length; i++) {
        prevGravelProgress[i] = currentTl[i]?.progress() ?? 0;
      }
    }

    function roll(direction: string) {
      if (currentTl.length === 1) {
        bindEvents();
      } else {
        recordProgress();
      }

      const tls = getRollAnims(direction);

      for (const tl of currentTl) {
        tl.kill();
      }

      currentTl = [];
      for (let j = 0; j < tls.length; j++) {
        currentTl[j] = tls[j];
        currentTl[j].play().timeScale(0);
        gsap.to(currentTl[j], { timeScale: slowMoFactorBody, duration: 1 / slowMoFactor });
      }
    }

    function stopPlayNext() {
      let direction: string;
      if (isRollingLeft) {
        isRollingLeft = false;
        direction = 'right';
      } else {
        isRollingLeft = true;
        direction = 'left';
      }
      gsap.to(currentTl, { timeScale: 0, duration: 0.5 / slowMoFactor, onComplete: () => roll(direction) });
    }

    function playIntro() {
      isIntro = false;
      currentTl[0] = getIntroAnim();
      currentTl[0].play();
    }

    function animate() {
      // Skip intro, go straight to rolling
      isIntro = false;
      bindEvents();
      roll('right');
    }

    // Start ticker
    gsap.ticker.add(wiggleHead);
    gsap.ticker.add(blinkLights);
    gsap.ticker.add(connectHeadToNull);

    setStart();
    animate();

    return () => {
      gsap.ticker.remove(wiggleHead);
      gsap.ticker.remove(blinkLights);
      gsap.ticker.remove(connectHeadToNull);
      for (const tl of currentTl) {
        tl.kill();
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="bb8-artwork"
      data-bb8="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2935 2935"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ opacity: 0 }}
    >
      <defs>
        <linearGradient id="bb8-sky-grad" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop stopColor="#F8E8C8" offset="0%" />
          <stop stopColor="#F0D8A8" offset="50%" />
          <stop stopColor="#E8C88C" stopOpacity="0" offset="100%" />
        </linearGradient>
        <circle id="bb8-path-1" data-bb8="largeMask" cx="1467.5" cy="1467.5" r="1467.5" />
        <path id="bb8-path-3" d="M0 10h3378v1068H0z" />
        <mask id="bb8-mask-4" width="3378" height="1068" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-3" />
        </mask>
        <linearGradient id="bb8-lg-5" x1="50%" x2="50%" y1="0%" y2="65.101%">
          <stop stopColor="#9B775B" stopOpacity="0" offset="0%" />
          <stop stopColor="#BE9371" stopOpacity=".742" offset="52.792%" />
          <stop stopColor="#CA9D79" offset="99.968%" />
        </linearGradient>
        <circle id="bb8-path-6" cx="412" cy="412" r="412" />
        <path id="bb8-path-8" d="M-488.933-686.737h1860.777V1174.04H-488.933z" />
        <mask id="bb8-mask-9" width="1860.777" height="1860.777" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-8" />
        </mask>
        <linearGradient id="bb8-lg-10" x1="48.662%" x2="48.662%" y1="36.666%" y2="87.375%">
          <stop stopColor="#000000" stopOpacity="0" offset="0%" />
          <stop stopColor="#000000" offset="100%" />
        </linearGradient>
        <circle id="bb8-path-11" cx="412.747" cy="412.128" r="412" />
        <path id="bb8-path-13" d="M264 370.683c244.5 0 241.808-41.645 241.808-41.645s13.634-2.917 14.683-7.156c4.91-19.82 7.51-40.528 7.51-61.835C528 116.427 409.803 0 264 0S0 116.427 0 260.047c0 21.157 2.565 41.724 7.405 61.415 1.764 7.177 19.336.646 21.69 7.576 2.355 6.93-9.596 41.645 234.905 41.645z" />
        <path id="bb8-path-15" d="M0 7h1174v66H0z" />
        <mask id="bb8-mask-16" width="1174" height="66" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-15" />
        </mask>
        <rect id="bb8-path-17" width="42" height="12" x="312" y="18" rx="6" />
        <mask id="bb8-mask-18" width="42" height="12" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-17" />
        </mask>
        <rect id="bb8-path-19" width="42" height="12" x="312" y="36" rx="6" />
        <mask id="bb8-mask-20" width="42" height="12" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-19" />
        </mask>
        <path id="bb8-path-21" d="M61 0h884v36H61z" />
        <mask id="bb8-mask-22" width="884" height="36" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-21" />
        </mask>
        <path id="bb8-path-23" d="M0 51h1060v16H0z" />
        <mask id="bb8-mask-24" width="1060" height="16" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-23" />
        </mask>
        <linearGradient id="bb8-lg-25" x1="50%" x2="50%" y1="0%" y2="61.269%">
          <stop stopColor="#7F7268" offset="0%" />
          <stop stopColor="#35240B" offset="100%" />
        </linearGradient>
        <path id="bb8-path-26" d="M458.955 92h-87.96c-5.51 0-9.995 4.475-9.995 9.994v47.012c0 5.52 4.475 9.994 9.995 9.994h144.96c-30.5-8.378-53.546-34.758-57-67z" />
        <mask id="bb8-mask-27" width="154.954" height="67" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-26" />
        </mask>
        <path id="bb8-path-28" d="M287.955 92H9.995C4.485 92 0 96.475 0 101.994v47.012C0 154.526 4.475 159 9.995 159h334.96l-57-67z" />
        <mask id="bb8-mask-29" width="344.954" height="67" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-28" />
        </mask>
        <path id="bb8-path-30" d="M632.244 93H813.99c5.528 0 10.01 4.482 10.01 10.003v92.994c0 5.524-4.478 10.003-10.01 10.003H619.01c-5.528 0-10.01-4.482-10.01-10.003v-57.112c12.396-11.952 20.856-27.96 23.244-45.885z" />
        <mask id="bb8-mask-31" width="215" height="113" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-30" />
        </mask>
        <path id="bb8-path-32" d="M872.244 93h181.746c5.528 0 10.01 4.482 10.01 10.003v92.994c0 5.524-4.478 10.003-10.01 10.003H859.01c-5.528 0-10.01-4.482-10.01-10.003v-57.112c12.396-11.952 20.856-27.96 23.244-45.885z" />
        <mask id="bb8-mask-33" width="215" height="113" x="0" y="0" fill="white">
          <use xlinkHref="#bb8-path-32" />
        </mask>
        <linearGradient id="bb8-lg-34" x1="50%" x2="50%" y1="13.3%" y2="100%">
          <stop stopColor="#000000" stopOpacity="0" offset="0%" />
          <stop stopColor="#000000" offset="100%" />
        </linearGradient>
        <path id="bb8-path-35" d="M264 370.683c244.5 0 241.808-41.645 241.808-41.645s13.634-2.917 14.683-7.156c4.91-19.82 7.51-40.528 7.51-61.835C528 116.427 409.803 0 264 0S0 116.427 0 260.047c0 21.157 2.565 41.724 7.405 61.415 1.764 7.177 19.336.646 21.69 7.576 2.355 6.93-9.596 41.645 234.905 41.645z" />
        <ellipse id="bb8-path-37" cx="54.36" cy="54.36" rx="54.36" ry="54.36" />
      </defs>
      <g id="bb8-comp" fill="none" fillRule="evenodd">
        <mask id="bb8-mask-2" fill="white">
          <use xlinkHref="#bb8-path-1" />
        </mask>
        <g id="bb8-artwork" mask="url(#bb8-mask-2)">
          {/* Background */}
          <g id="bb8-background">
            {/* Sand dune sky */}
            <rect x="-200" y="-200" width="3335" height="1800" fill="#F5DEB3" />
            {/* Warm sky gradient overlay */}
            <rect x="-200" y="-200" width="3335" height="1200" fill="url(#bb8-sky-grad)" />
            {/* Far dunes */}
            <path d="M-200 1200 C200 1000, 600 1050, 900 1100 C1200 1150, 1500 1000, 1800 1050 C2100 1100, 2400 950, 2700 1000 L3200 1000 L3200 1600 L-200 1600Z" fill="#D4A76A" />
            {/* Mid dunes */}
            <path d="M-200 1300 C100 1150, 500 1200, 800 1250 C1100 1300, 1400 1150, 1700 1200 C2000 1250, 2300 1100, 2600 1150 C2900 1200, 3100 1100, 3200 1150 L3200 1700 L-200 1700Z" fill="#C49A5C" />
            {/* Near dunes */}
            <path d="M-200 1450 C200 1350, 600 1400, 1000 1380 C1400 1360, 1600 1300, 1900 1350 C2200 1400, 2500 1300, 2800 1350 L3200 1400 L3200 2000 L-200 2000Z" fill="#B8893E" />
            {/* Ground */}
            <g id="bb8-ground" transform="translate(-650 1467)">
              <rect width="4033" height="1623" fill="#A67C3D" />
            </g>
            <g data-bb8="gravelGroup">
              {Array.from({ length: 20 }).map((_, i) => (
                <g key={i} data-bb8="gravel">
                  <path fill="#C9A96E" d="M213 1969.8l1-18-31.7-9.8-17.4 11-8.8 18.7 34 5.2" />
                  <path fill="#8B6B3D" d="M213 1969.8l1-18-23.7-3.7-5.2 8.6-15.8 2.2-13 13 34 5" />
                </g>
              ))}
            </g>
          </g>
          {/* BB-8 Unit */}
          <g id="bb8-main" data-bb8="bb8" transform="translate(532 992)">
            <g data-bb8="bodyShadow">
              <ellipse cx="1030.5" cy="1338" fill="#000000" opacity=".2" rx="408.5" ry="96" />
              <ellipse cx="994" cy="1338" fill="#000000" opacity=".074" rx="268.5" ry="63.176" />
              <ellipse cx="970.5" cy="1349" fill="#000000" opacity=".124" rx="157.5" ry="37" />
            </g>
            <g data-bb8="unit">
              {/* Body */}
              <g id="bb8-body" transform="translate(543 543)">
                <mask id="bb8-mask-7" fill="white">
                  <use xlinkHref="#bb8-path-6" />
                </mask>
                <use fill="#D8D8D8" opacity=".01" xlinkHref="#bb8-path-6" />
                <g fill="#EEEEEE" stroke="#979797" strokeWidth="2" mask="url(#bb8-mask-7)">
                  <use mask="url(#bb8-mask-9)" xlinkHref="#bb8-path-8" />
                </g>
                <g mask="url(#bb8-mask-7)">
                  <g data-bb8="bodySurface" transform="translate(-527.778 -659.71)">
                    <circle cx="979.778" cy="961.71" r="961.145" stroke="#9E0707" />
                    {/* Body details */}
                    <g stroke="#563402">
                      <path strokeWidth="3" d="M757.37 950.773l53.952 114.127 249.967 102.512 126.652-161.283-103.638-178.39-211.363-38.997z" opacity=".189" />
                      <path strokeWidth="3" d="M469.37 860.382l-294.048 373.864 499.377 67.14 58.713-143.27 37.357-27.652-95.918-196.152-94.11-1.142z" opacity=".189" />
                      <path strokeWidth="3" d="M1266.78 646.348l-137.593-455.31-341.43 370.556 83.685 130.273 1.223 46.46 215.695 33.938 54.914-76.435z" opacity=".189" />
                      <path strokeWidth="3" d="M1452.486 1045.965l209.892 406.83-595.744 19.422 45.677-139.923-10.79-104.814 134.603-191.923 92.29 18.45z" opacity=".189" />
                    </g>
                    {/* Hatches */}
                    <g>
                      <path fill="#D38328" stroke="#000000" strokeOpacity=".5" d="M899 1560c-138.07 0-250-111.93-250-250s111.93-250 250-250 250 111.93 250 250-111.93 250-250 250zm.383-58.233c106.25 0 192.384-86.133 192.384-192.384 0-106.25-86.133-192.383-192.384-192.383C793.133 1117 707 1203.133 707 1309.383c0 106.25 86.133 192.384 192.383 192.384z" />
                      <path fill="#D38328" stroke="#000000" strokeOpacity=".5" d="M669 980c138.07 0 250-111.93 250-250S807.07 480 669 480 419 591.93 419 730s111.93 250 250 250zm-.383-58.233c-106.25 0-192.384-86.133-192.384-192.384 0-106.25 86.133-192.383 192.384-192.383C774.867 537 861 623.133 861 729.383c0 106.25-86.133 192.384-192.383 192.384z" />
                      <path fill="#D38328" stroke="#000000" strokeOpacity=".5" d="M1320 577c138.07 0 250 111.93 250 250s-111.93 250-250 250-250-111.93-250-250 111.93-250 250-250zm-.383 58.233c-106.25 0-192.384 86.133-192.384 192.384 0 106.25 86.133 192.383 192.384 192.383 106.25 0 192.383-86.133 192.383-192.383 0-106.25-86.133-192.384-192.383-192.384z" />
                    </g>
                  </g>
                </g>
                {/* Body shading */}
                <g data-bb8="hoverTarget" mask="url(#bb8-mask-7)">
                  <g>
                    <path fill="#A96B29" d="M412 824c227.54 0 412-184.46 412-412 0 0-60.768 181.768-369.107 218.852C146.555 667.936 13.386 516.567 13.386 516.567 59.666 693.47 220.59 824 412 824z" opacity=".1" />
                    <path fill="#945E25" d="M412 824c120.745 0 229.358-51.942 304.715-134.7 0 0-120.904 56.673-244.506 81.066-123.603 24.393-306.35-27.943-306.35-27.943C234.534 793.665 319.724 824 412 824z" opacity=".275" />
                    <path fill="#FFFFFF" d="M85.81 6.772C-12.305 39.65-83 132.32-83 241.5-83 378.19 27.81 489 164.5 489S412 378.19 412 241.5c0-30.633-5.565-59.966-15.74-87.043C216.487 149.372 75.254 98.222 75.254 35.872c0-10.04 3.662-19.787 10.556-29.1z" opacity=".178" />
                    <path fill="#FFFFFF" d="M538.37 148.597C531.023 167.824 527 188.692 527 210.5c0 95.82 77.68 173.5 173.5 173.5S874 306.32 874 210.5c0-70.03-41.49-130.37-101.233-157.78-18.73 44.872-111.18 81.692-234.398 95.877z" opacity=".178" />
                    <path fill="url(#bb8-lg-10)" d="M20.222 0H925.71v905.487H20.22z" opacity=".399" transform="translate(-83 -40)" />
                  </g>
                </g>
              </g>
              {/* Head */}
              <g data-bb8="rotatingHead">
                {/* Head shadow */}
                <g transform="translate(542.253 542.872)">
                  <mask id="bb8-mask-12" fill="white">
                    <use xlinkHref="#bb8-path-11" />
                  </mask>
                  <g fill="#000000" mask="url(#bb8-mask-12)">
                    <g transform="translate(46 -144)">
                      <ellipse data-bb8="headShadowBig" cx="380.5" cy="180" opacity=".108" rx="350.5" ry="119" />
                      <ellipse data-bb8="headShadowSmall" cx="350.505" cy="119.476" opacity=".426" rx="350.5" ry="119" />
                    </g>
                  </g>
                </g>
                <circle cx="955" cy="955" r="955" stroke="#EB0000" opacity=".01" />
                <g data-bb8="bouncingHead">
                  <path fill="#EEEEEE" d="M946 613.683c244.5 0 241.808-41.645 241.808-41.645s13.634-2.917 14.683-7.156c4.91-19.82 7.51-40.528 7.51-61.835C1210 359.427 1091.803 243 946 243S682 359.427 682 503.047c0 21.157 2.565 41.724 7.405 61.415 1.764 7.177 19.336.646 21.69 7.576 2.355 6.93-9.596 41.645 234.905 41.645z" opacity=".01" />
                  {/* Antennas */}
                  <g data-bb8="antennaShort">
                    <path fill="#9B9B9B" d="M996 125h7v317h-7z" />
                    <path fill="#6E6E6E" d="M996 125h7v60h-7z" />
                  </g>
                  <g data-bb8="antennaLong">
                    <path fill="#808080" d="M975 75h7v317h-7z" />
                    <path fill="#484848" d="M974 80h9v101h-9z" />
                    <path fill="#737171" d="M974 75h9v101h-9z" />
                  </g>
                  {/* Head surface */}
                  <g transform="translate(682 243)">
                    <mask id="bb8-mask-14" fill="white">
                      <use xlinkHref="#bb8-path-13" />
                    </mask>
                    <use fill="#FFFFFF" xlinkHref="#bb8-path-13" />
                    <g mask="url(#bb8-mask-14)">
                      <g data-bb8="headSurface">
                        {/* Orange band */}
                        <g transform="translate(-245 237)">
                          <use fill="#D38328" stroke="#000000" strokeOpacity=".255" strokeWidth="2" mask="url(#bb8-mask-16)" xlinkHref="#bb8-path-15" />
                          <use data-bb8="upperLight" fill="#70DDFF" stroke="#000000" strokeOpacity=".204" strokeWidth="2" mask="url(#bb8-mask-18)" xlinkHref="#bb8-path-17" />
                          <use data-bb8="lowerLight" fill="#70DDFF" stroke="#000000" strokeOpacity=".204" strokeWidth="2" mask="url(#bb8-mask-20)" xlinkHref="#bb8-path-19" />
                          <path fill="#FFFFFF" d="M366 0h26v83h-26z" />
                          <path fill="#FFFFFF" d="M229 0h43v83h-43z" />
                          <path fill="#FFFFFF" d="M412 0h300v83H412z" />
                          <path fill="#FFFFFF" d="M758 0h-16v83h16z" />
                          <path fill="#FFFFFF" d="M788 0h-16v83h16z" />
                          <path fill="#FFFFFF" d="M818 0h-16v83h16z" />
                          <path fill="#FFFFFF" d="M914 0h-52v83h52z" />
                        </g>
                        {/* Head band */}
                        <g stroke="#000000" strokeOpacity=".255" strokeWidth="2" transform="translate(-206 21)">
                          <use fill="#7F8D93" mask="url(#bb8-mask-22)" xlinkHref="#bb8-path-21" />
                          <use fill="#D38328" mask="url(#bb8-mask-24)" xlinkHref="#bb8-path-23" />
                        </g>
                        <path stroke="#BDBDBD" strokeWidth="5" d="M877.5 319.5h-915" strokeLinecap="square" />
                        <path stroke="#979797" strokeWidth="5" d="M444.5 301.5h-247" strokeLinecap="square" />
                        <path fill="#979797" d="M425 292h22v11h-22z" />
                        <path fill="url(#bb8-lg-25)" d="M26 306h1216v103H26z" transform="translate(-274 21)" />
                        {/* Mouth */}
                        <g transform="translate(248 251)">
                          <circle cx="11" cy="18" r="11" fill="#878787" />
                          <path stroke="#8F8F8F" strokeWidth="3" d="M18 36C8.06 36 0 27.94 0 18S8.06 0 18 0s18 8.06 18 18-8.06 18-18 18z" />
                        </g>
                        {/* Eye details */}
                        <g transform="translate(210 87)">
                          <ellipse cx="60.72" cy="74.573" fill="#2F2F2F" opacity=".162" rx="60" ry="60" />
                          <ellipse cx="60.72" cy="60.573" fill="#2F2F2F" rx="60" ry="60" />
                          <ellipse cx="198.4" cy="129.853" stroke="#2F2F2F" strokeWidth="8.8" rx="42.18" ry="40.628" />
                          <ellipse cx="198.4" cy="139.853" fill="#2E2E2E" opacity=".147" rx="28.16" ry="28.209" />
                          <ellipse cx="198.4" cy="129.853" fill="#2E2E2E" rx="28.16" ry="28.209" />
                        </g>
                      </g>
                    </g>
                    {/* Head shading */}
                    <path fill="#000000" d="M264 370.683c244.5 0 241.808-41.645 241.808-41.645s13.634-2.917 14.683-7.156c4.91-19.82 7.51-40.528 7.51-61.835 0-27.7-4.397-54.39-12.542-79.43 0 0-154.306 36.086-271.986 36.086-111.143 0-224.65-53.27-224.65-53.27C6.678 193.3 0 225.905 0 260.046c0 21.157 2.565 41.724 7.405 61.415 1.764 7.177 19.336.646 21.69 7.576 2.355 6.93-9.596 41.645 234.905 41.645z" opacity=".05" mask="url(#bb8-mask-14)" />
                    <path fill="#FFFFFF" d="M229.805-46.964 582-92v419H403.965s19.035-115.037 0-189.275-174.16-184.69-174.16-184.69z" opacity=".229" mask="url(#bb8-mask-14)" />
                    <mask id="bb8-mask-36" fill="white">
                      <use xlinkHref="#bb8-path-35" />
                    </mask>
                    <use fill="url(#bb8-lg-34)" opacity=".251" xlinkHref="#bb8-path-35" />
                    {/* Eyes */}
                    <g>
                      {/* Little eye */}
                      <g data-bb8="littleEye" transform="translate(383 191)">
                        <ellipse cx="25.4" cy="25.853" fill="#484848" rx="25.38" ry="25.424" />
                        <ellipse cx="25.4" cy="25.853" fill="#333333" rx="22.49" ry="22.529" />
                        <ellipse cx="27.4" cy="24.853" fill="#232323" rx="20.545" ry="20.58" />
                        <circle cx="19.5" cy="15.5" r="2.5" fill="#FFFFFF" opacity=".684" />
                        <circle cx="29.5" cy="12.5" r="2.5" fill="#FFFFFF" opacity=".684" />
                        <circle cx="40.5" cy="20.5" r="3.5" fill="#FFFFFF" opacity=".684" />
                      </g>
                      {/* Big eye */}
                      <g data-bb8="bigEye" transform="translate(216 88)">
                        <ellipse cx="54.36" cy="54.36" fill="#1C1C1C" rx="54.36" ry="54.36" />
                        <g>
                          <mask id="bb8-mask-38" fill="white">
                            <use xlinkHref="#bb8-path-37" />
                          </mask>
                          <use fill="#1C1C1C" xlinkHref="#bb8-path-37" />
                          <g mask="url(#bb8-mask-38)">
                            <g data-bb8="pupilGroup" transform="translate(26 26)">
                              <ellipse data-bb8="pupil1" cx="28.147" cy="28.147" fill="#411414" rx="28.147" ry="28.147" />
                              <ellipse data-bb8="pupil2" cx="28.517" cy="28.517" fill="#FF0006" opacity=".319" rx="16.517" ry="16.517" />
                              <ellipse data-bb8="pupil3" cx="27.938" cy="27.938" fill="#FF0006" opacity=".319" rx="8.938" ry="8.938" />
                              <ellipse data-bb8="pupil4" cx="28.697" cy="28.697" fill="#EEEEEE" opacity=".78" rx="2.697" ry="2.697" />
                            </g>
                            <g data-bb8="eyeHighlight" transform="translate(15 3)">
                              <path fill="#F2F2F2" d="M27.786 23.09c13.335-3.575 25.22-6.924 24.08-11.183-1.142-4.26-14.877-7.815-28.212-4.242-13.335 3.573-21.22 12.922-20.08 17.18 1.142 4.26 10.877 1.817 24.212-1.756z" opacity=".26" />
                              <circle cx="64.5" cy="29.5" r="5.5" fill="#FFFFFF" opacity=".582" />
                              <circle cx="65" cy="30" r="12" fill="#FFFFFF" opacity=".133" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
