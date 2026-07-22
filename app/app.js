(function(){
  "use strict";

  /* ============================= STATE ============================= */
  const DEFAULT_PALETTE = ['#ff5d8f','#4fd9c0','#e8b34c','#7c83fd','#ff8c42','#59c9a5','#c65bcf','#f2545b'];

  const PALETTE_GROUPS = {
    'Vibrant': {
      'Carnival':        ['#ff5d8f','#4fd9c0','#e8b34c','#7c83fd','#ff8c42','#59c9a5','#c65bcf','#f2545b'],
      'Neon':             ['#ff2e88','#00f5d4','#ffea00','#8a2be2','#ff6d00','#00e0ff','#d400ff','#39ff14'],
      'Candy Pop':        ['#ff6ec7','#ffd23f','#3bceac','#ee4266','#0ead69','#54478c','#f78764','#4059ad'],
      'Tropical Punch':   ['#ff5e5b','#ffed66','#00cecb','#ff9a00','#2ec4b6','#e71d36','#ff6f59','#6a4c93']
    },
    'Pastel': {
      'Pastel':           ['#ffb3c6','#b8f2e6','#ffe08a','#c7ceff','#ffd6a5','#a0e7e5','#e2b6f7','#ffadad'],
      'Cotton Candy':     ['#ffd1dc','#c1e7ff','#fff5ba','#d5c6ff','#c2f0c2','#ffcfe0','#b5ead7','#e0c3fc'],
      'Sherbet Fizz':     ['#ffb5a7','#fcd5ce','#f9dcc4','#fec89a','#ffd6a5','#caffbf','#9bf6ff','#a0e7e5'],
      'Powder Sky':       ['#a8dadc','#cde7f0','#e0fbfc','#c9ada7','#f6bd60','#f7ede2','#84a59d','#f28482']
    },
    'Seasonal': {
      'Spring Bloom':     ['#ffb7c5','#a1de93','#fdffb6','#caffbf','#9bf6ff','#a0c4ff','#bdb2ff','#ffc6ff'],
      'Summer Heat':      ['#ff6b35','#f7c548','#2ec4b6','#ff9f1c','#e71d36','#ffd23f','#06aed5','#f4a261'],
      'Autumn Harvest':   ['#d62828','#f77f00','#fcbf49','#eae2b7','#8d5524','#bc6c25','#606c38','#a44a3f'],
      'Winter Frost':     ['#caf0f8','#90e0ef','#00b4d8','#0077b6','#03045e','#ade8f4','#e0fbfc','#a3cef1']
    },
    'Holiday': {
      'Halloween':        ['#ff7518','#2b2b2b','#8b00ff','#39ff14','#f5f0e6','#6a0dad','#ff4500','#4b0082'],
      'Christmas':        ['#c1121f','#0b6e4f','#f4d35e','#f1faee','#780116','#2a9d8f','#e63946','#1d3557'],
      "Valentine's Day":  ['#ff8fa3','#ff477e','#ff0a54','#ff85a1','#fbb1bd','#f9bec7','#c9184a','#590d22'],
      "New Year's Eve":   ['#ffd700','#c0c0c0','#2b2b2b','#e5e4e2','#8a2be2','#ff1493','#00bfff','#b76e79']
    },
    'Elegant': {
      'Gold':             ['#e8b34c','#f3cd7e','#c9932f','#fff1c9','#b9822a','#f6dca0','#8f6a22','#ecc873'],
      'Rose Gold':        ['#e8b4b8','#c98a94','#f5cac3','#f0a6a0','#b76e79','#eec9d2','#d8a48f','#a4626a'],
      'Slate & Steel':    ['#8d99ae','#2b2d42','#edf2f4','#457b9d','#1d3557','#a8dadc','#6c757d','#adb5bd'],
      'Midnight Jewel':   ['#3a0ca3','#7209b7','#f72585','#4361ee','#4cc9f0','#560bad','#b5179e','#480ca8']
    },
    'Nature': {
      'Ocean Deep':       ['#03045e','#023e8a','#0077b6','#0096c7','#00b4d8','#48cae4','#90e0ef','#ade8f4'],
      'Forest Canopy':    ['#081c15','#1b4332','#2d6a4f','#40916c','#52b788','#74c69d','#95d5b2','#b7e4c7'],
      'Desert Bloom':     ['#e09f3e','#9e2a2b','#540b0e','#fff3b0','#335c67','#c9ada7','#f2cc8f','#81667a'],
      'Sunset Ridge':     ['#ff9e00','#ff6d00','#ff5400','#e85d04','#dc2f02','#9d0208','#370617','#6a040f']
    },
    'Trending 2026': {
      // Each entry is one of the 10 named color-family trends called out in
      // Gelato's "Trending colors 2026" design forecast report — translated
      // into ready-to-use hex swatches since the report describes them by
      // name (merlot, mocha, sage, etc.) rather than exact codes.
      'Deep Reds & Burgundies':  ['#5b0e2d','#722f37','#8a1c2e','#a91b2e','#c9a24b','#3d0f1f'],
      'Dark Blues & Navies':     ['#0b1f3a','#14213d','#1d3557','#3a6ea5','#b5651d','#f1efe8'],
      'Rich Browns & Caramels':  ['#4a2c1a','#6f4e37','#8b5a2b','#c68642','#e8d3b0','#7d8471'],
      'Plum & Dark Purples':     ['#3a1731','#4b2142','#5e2750','#6a2c70','#8e3b6d','#c9a24b'],
      'Muted Greens & Olives':   ['#4a5d23','#708238','#9caf88','#bfae7a','#d8c9a3','#5c4536'],
      'Soft Pinks & Mauves':     ['#a26a7d','#c98b96','#e8a0a0','#f0b8b8','#f7cac9','#f4e2e2'],
      'Warm Neutrals & Beiges':  ['#f5ecdc','#e8dcc8','#d8c3a5','#b8a88a','#8a7860','#1d3557'],
      'Bold Jewel Tones':        ['#046a38','#0f52ba','#6f2da8','#9b111e','#d4af37','#0d5c63'],
      'Dark Wood Tones':         ['#2b2b2b','#3e2723','#5c4033','#6a2e2e','#8b5e34','#a9865b'],
      'Black & Brown':           ['#1c1c1c','#3e2723','#4a2c1a','#8b5e34','#b5895b','#c19a6b']
    },
    'Timeless': {
      // Ten of the most enduring, widely-adopted palettes in modern design —
      // verified against their original documented specs (not reinterpreted
      // like the seasonal/trend groups above).
      'Flat UI Colors':      ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#f1c40f','#e67e22','#e74c3c'], // Designmodo, 2013
      'Material Design':     ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#009688','#4caf50','#ffc107','#ff5722'], // Google, 2014
      'Solarized':           ['#002b36','#b58900','#cb4b16','#dc322f','#d33682','#268bd2','#2aa198','#859900'], // Ethan Schoonover, 2011
      'Monokai':             ['#272822','#f92672','#fd971f','#e6db74','#a6e22e','#66d9ef','#ae81ff','#75715e'], // Wimer Hazenberg, ~2006
      'Web Safe Classics':   ['#003366','#336699','#6699cc','#99ccff','#ff6600','#ffcc00','#669933','#993366'], // 216-color web-safe palette, 1990s
      'Crayola Classic 8':   ['#ed0a3f','#ff8833','#fbe870','#01a368','#0066ff','#8359a3','#af593e','#000000'], // original 1903 box, unchanged since
      'Bauhaus':             ['#e32119','#f9c200','#005293','#1a1a1a','#f2f0e6'], // primary-color design school, 1919–1933
      'Memphis Milano':      ['#ff6ec7','#00ced1','#ffd700','#ff6f61','#0047ab','#1a1a1a'], // postmodern design collective, 1980s
      'iOS System Colors':   ['#ff3b30','#ff9500','#ffcc00','#34c759','#007aff','#5856d6','#af52de','#ff2d55'], // Apple Human Interface Guidelines
      "Pantone Colors of the Year": ['#9bb7d4','#bf1932','#e2583e','#9b1b30','#45b5aa','#009473','#5f4b8b','#0f4c81','#bb2649','#a47864'] // 2000–2025, one per year
    }
  };

  const TITLE_FONTS = [
    { id:'fraunces',     label:'Fraunces',        family:"'Fraunces', serif",        weight:700, style:'normal', letterSpacing:'0.3px',  sizeMult:1    },
    { id:'playfair',     label:'Playfair Display',family:"'Playfair Display', serif", weight:800, style:'italic', letterSpacing:'0px',    sizeMult:1    },
    { id:'bebas',        label:'Bebas Neue',      family:"'Bebas Neue', sans-serif",  weight:400, style:'normal', letterSpacing:'1.5px',  sizeMult:1.15 },
    { id:'spacegrotesk', label:'Space Grotesk',   family:"'Space Grotesk', sans-serif",weight:700,style:'normal', letterSpacing:'-0.5px', sizeMult:1    },
    { id:'righteous',    label:'Righteous',       family:"'Righteous', cursive",      weight:400, style:'normal', letterSpacing:'0px',    sizeMult:1    },
    { id:'caveat',       label:'Caveat',          family:"'Caveat', cursive",         weight:700, style:'normal', letterSpacing:'0px',    sizeMult:1.3  }
  ];

  let state = {
    wheelName: 'Untitled Wheel',
    items: [
      { id: id(), label: 'Pizza',   weight: 3, color: null, image: null, winSound: null },
      { id: id(), label: 'Sushi',   weight: 1, color: null, image: null, winSound: null },
      { id: id(), label: 'Tacos',   weight: 2, color: null, image: null, winSound: null },
      { id: id(), label: 'Burgers', weight: 2, color: null, image: null, winSound: null }
    ],
    paletteName: 'Carnival',
    settings: { wheelStyle: 'wheel', nearMiss: false, duration: 6, spins: 6, angle: 0, easing: 'cubic', labelCharLimit: 32, labelOverflow: false, labelRawSize: 17, slotLabelCharLimit: 24, slotLabelFontSize: 26, idleSpin: true, bannerImageLayout: 'left', bannerImageOpacity: 1, bannerImageFit: 'contain', wheelTitleFont: 'fraunces', wheelTitleSize: 26, randomizeAngle: false },
    sound: {
      music: true, tick: true, win: true, spinStart: true,
      duckOnWin: false, duckLevel: 0.3, recencyWeighted: true, normalizeCustom: true, normalizeTargetPeak: 0.85,
      volumes: { music: 0.45, tick: 0.4, win: 0.55, spinStart: 0.6 },
      source: { music: 'generated', tick: 'generated', win: 'generated', spinStart: 'generated' },
      variant: { music: 'classic', tick: 'classic', win: 'classicChime', spinStart: 'quickWhoosh' }
    }
  };
  let savedWheels = {};
  let history = [];
  // user-created palettes: name -> [hex, hex, ...]
  let customPalettes = {};
  // which theme group is currently shown in the Settings palette browser (not persisted)
  let uiPaletteGroup = 'Vibrant';
  // colors currently being assembled in the "Build your own" builder
  let paletteDraft = ['#ff5d8f','#4fd9c0','#e8b34c','#7c83fd','#ff8c42'];
  // user-uploaded clips per category: { music:[{dataURL,name,size},...], tick:[...], win:[...], spinStart:[...] }
  let customSounds = { music: [], tick: [], win: [], spinStart: [] };
  // decoded AudioBuffers, in-memory only, same shape/order as customSounds
  let customBuffers = { music: [], tick: [], win: [], spinStart: [] };
  // per-item images: itemId -> dataURL. Actual bytes are stored under their own
  // storage key (item-image:<id>) so one huge item image can't crowd out others.
  let itemImages = {};
  const MAX_ITEM_IMAGE_BYTES = 3.5 * 1000 * 1000; // same reasoning as MAX_SOUND_BYTES below
  // per-item winner-sound overrides: itemId -> dataURL, mirrors itemImages exactly.
  // A decoded-buffer cache lives alongside it so playback at the winner moment is
  // synchronous, same as every other sound in the app.
  let itemWinSounds = {};
  let itemWinSoundBuffers = {};

  const SOUND_DEFS = [
    { key: 'music',     title: 'Spin whir',   desc: 'Ambient sound while the wheel spins' },
    { key: 'tick',      title: 'Tick',        desc: 'Click as each divider passes the pointer' },
    { key: 'win',       title: 'Win fanfare', desc: 'Plays when the wheel settles' },
    { key: 'spinStart', title: 'Spin start',  desc: 'Plays once when you press Spin (not when you stop it early)' }
  ];
  const MAX_SOUND_BYTES = 3.5 * 1000 * 1000; // per-clip cap (raw bytes) — the largest that still fits
                                              // under the platform's 5MB-per-key storage ceiling once
                                              // base64-encoded (~33% larger) for persistence
  const MAX_CLIPS_PER_SOUND = 25;

  /* ---------- generated sound library ---------- */
  // A short looping noise buffer, used as the raw material for several whir variants.
  function createNoiseSource(ac){
    const bufferSize = 2 * ac.sampleRate;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++) data[i] = Math.random()*2-1;
    const src = ac.createBufferSource();
    src.buffer = buffer; src.loop = true;
    return src;
  }

  // Continuous, speed-reactive whir variants. build(ac) returns
  // { output: AudioNode, sources: [nodes needing .start()], update(speedFactor) }.
  const MUSIC_VARIANTS = [
    { id:'classic', name:'Classic Whir', build(ac){
      const src = createNoiseSource(ac);
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 300; filter.Q.value = 0.8;
      src.connect(filter);
      return { output: filter, sources: [src],
        update(speed){ filter.frequency.setTargetAtTime(180+speed*900, ac.currentTime, 0.05); } };
    }},
    { id:'turbo', name:'Turbo Rev', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 200; filter.Q.value = 6;
      noise.connect(filter);
      const sub = ac.createOscillator();
      sub.type = 'sawtooth'; sub.frequency.value = 55;
      const subGain = ac.createGain(); subGain.gain.value = 0.5;
      sub.connect(subGain);
      const merge = ac.createGain();
      filter.connect(merge); subGain.connect(merge);
      return { output: merge, sources: [noise, sub],
        update(speed){
          filter.frequency.setTargetAtTime(150+speed*2000, ac.currentTime, 0.05);
          sub.frequency.setTargetAtTime(45+speed*220, ac.currentTime, 0.05);
        } };
    }},
    { id:'scifi', name:'Sci-Fi Hum', build(ac){
      const osc1 = ac.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 120;
      const osc2 = ac.createOscillator(); osc2.type = 'triangle'; osc2.frequency.value = 124;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 5;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 8;
      lfo.connect(lfoGain); lfoGain.connect(osc1.frequency);
      const merge = ac.createGain();
      osc1.connect(merge); osc2.connect(merge);
      return { output: merge, sources: [osc1, osc2, lfo],
        update(speed){
          const base = 100+speed*500;
          osc1.frequency.setTargetAtTime(base, ac.currentTime, 0.08);
          osc2.frequency.setTargetAtTime(base*1.02, ac.currentTime, 0.08);
          lfo.frequency.setTargetAtTime(3+speed*10, ac.currentTime, 0.08);
        } };
    }},
    { id:'reel', name:'Slot Machine Reel', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 1200; filter.Q.value = 8;
      noise.connect(filter);
      const trem = ac.createOscillator(); trem.type = 'square'; trem.frequency.value = 6;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      filter.connect(baseGain);
      return { output: baseGain, sources: [noise, trem],
        update(speed){ trem.frequency.setTargetAtTime(3+speed*22, ac.currentTime, 0.03); } };
    }},
    { id:'heartbeat', name:'Heartbeat Suspense', build(ac){
      const osc = ac.createOscillator(); osc.type = 'sine'; osc.frequency.value = 70;
      const trem = ac.createOscillator(); trem.type = 'sine'; trem.frequency.value = 1.2;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      osc.connect(baseGain);
      return { output: baseGain, sources: [osc, trem],
        update(speed){ trem.frequency.setTargetAtTime(1+speed*4, ac.currentTime, 0.05); } };
    }},
    { id:'kazoo', name:'Kazoo Wobble', build(ac){
      const osc = ac.createOscillator(); osc.type = 'triangle'; osc.frequency.value = 260;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 7;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 30;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      return { output: osc, sources: [osc, lfo],
        update(speed){ osc.frequency.setTargetAtTime(180+speed*400, ac.currentTime, 0.06); } };
    }},
    { id:'ocean', name:'Ocean Waves', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 400; filter.Q.value = 1;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.3;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 250;
      lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
      noise.connect(filter);
      return { output: filter, sources: [noise, lfo],
        update(speed){ lfo.frequency.setTargetAtTime(0.2+speed*3, ac.currentTime, 0.1); filter.frequency.setTargetAtTime(300+speed*1200, ac.currentTime, 0.1); } };
    }},
    { id:'heli', name:'Helicopter Blades', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 500; filter.Q.value = 2;
      const trem = ac.createOscillator(); trem.type = 'square'; trem.frequency.value = 9;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      noise.connect(filter); filter.connect(baseGain);
      return { output: baseGain, sources: [noise, trem],
        update(speed){ trem.frequency.setTargetAtTime(5+speed*20, ac.currentTime, 0.02); } };
    }},
    { id:'didj', name:'Didgeridoo Drone', build(ac){
      const osc = ac.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = 65;
      const filter = ac.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 300; filter.Q.value = 4;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 4;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 100;
      lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
      osc.connect(filter);
      return { output: filter, sources: [osc, lfo],
        update(speed){ osc.frequency.setTargetAtTime(55+speed*70, ac.currentTime, 0.08); lfo.frequency.setTargetAtTime(3+speed*8, ac.currentTime, 0.08); } };
    }},
    { id:'robot', name:'Robot Beep Loop', build(ac){
      const osc = ac.createOscillator(); osc.type = 'square'; osc.frequency.value = 600;
      const trem = ac.createOscillator(); trem.type = 'square'; trem.frequency.value = 4;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      osc.connect(baseGain);
      return { output: baseGain, sources: [osc, trem],
        update(speed){ osc.frequency.setTargetAtTime(400+speed*900, ac.currentTime, 0.05); trem.frequency.setTargetAtTime(2+speed*10, ac.currentTime, 0.05); } };
    }},
    { id:'wind', name:'Wind Tunnel', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 600; filter.Q.value = 0.7;
      noise.connect(filter);
      return { output: filter, sources: [noise],
        update(speed){ filter.frequency.setTargetAtTime(300+speed*2500, ac.currentTime, 0.06); } };
    }},
    { id:'dialup', name:'Dial-Up Modem', build(ac){
      const osc1 = ac.createOscillator(); osc1.type = 'square'; osc1.frequency.value = 900;
      const osc2 = ac.createOscillator(); osc2.type = 'sawtooth'; osc2.frequency.value = 1300;
      const merge = ac.createGain(); merge.gain.value = 0.5;
      osc1.connect(merge); osc2.connect(merge);
      return { output: merge, sources: [osc1, osc2],
        update(speed){ osc1.frequency.setTargetAtTime(500+speed*1800, ac.currentTime, 0.03); osc2.frequency.setTargetAtTime(700+speed*2500, ac.currentTime, 0.03); } };
    }},
    { id:'bike', name:'Bicycle Spokes', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 2500; filter.Q.value = 10;
      const trem = ac.createOscillator(); trem.type = 'square'; trem.frequency.value = 8;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      noise.connect(filter); filter.connect(baseGain);
      return { output: baseGain, sources: [noise, trem],
        update(speed){ trem.frequency.setTargetAtTime(4+speed*26, ac.currentTime, 0.02); } };
    }},
    { id:'spacedrone', name:'Space Drone', build(ac){
      const osc1 = ac.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 110;
      const osc2 = ac.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 113;
      const merge = ac.createGain(); merge.gain.value = 0.5;
      osc1.connect(merge); osc2.connect(merge);
      return { output: merge, sources: [osc1, osc2],
        update(speed){ osc1.frequency.setTargetAtTime(90+speed*400, ac.currentTime, 0.08); osc2.frequency.setTargetAtTime(95+speed*420, ac.currentTime, 0.08); } };
    }},
    { id:'siren', name:'Arcade Siren', build(ac){
      const osc = ac.createOscillator(); osc.type = 'triangle'; osc.frequency.value = 500;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 1.5;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 200;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      return { output: osc, sources: [osc, lfo],
        update(speed){ lfo.frequency.setTargetAtTime(1+speed*6, ac.currentTime, 0.06); lfoGain.gain.setTargetAtTime(150+speed*400, ac.currentTime, 0.06); } };
    }},
    { id:'vinyl', name:'Vinyl Crackle', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 2000; filter.Q.value = 0.5;
      const trem = ac.createOscillator(); trem.type = 'sawtooth'; trem.frequency.value = 14;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.4;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.3;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      noise.connect(filter); filter.connect(baseGain);
      return { output: baseGain, sources: [noise, trem],
        update(speed){ trem.frequency.setTargetAtTime(8+speed*40, ac.currentTime, 0.02); } };
    }},
    { id:'woodpecker', name:'Woodpecker Knock', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 500; filter.Q.value = 6;
      const trem = ac.createOscillator(); trem.type = 'square'; trem.frequency.value = 5;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      noise.connect(filter); filter.connect(baseGain);
      return { output: baseGain, sources: [noise, trem],
        update(speed){ trem.frequency.setTargetAtTime(3+speed*14, ac.currentTime, 0.03); } };
    }},
    { id:'jungle', name:'Jungle Drums', build(ac){
      const osc = ac.createOscillator(); osc.type = 'sine'; osc.frequency.value = 95;
      const trem = ac.createOscillator(); trem.type = 'sine'; trem.frequency.value = 2;
      const tremGain = ac.createGain(); tremGain.gain.value = 0.5;
      const baseGain = ac.createGain(); baseGain.gain.value = 0.5;
      trem.connect(tremGain); tremGain.connect(baseGain.gain);
      osc.connect(baseGain);
      return { output: baseGain, sources: [osc, trem],
        update(speed){ trem.frequency.setTargetAtTime(1.5+speed*6, ac.currentTime, 0.05); osc.frequency.setTargetAtTime(85+speed*60, ac.currentTime, 0.08); } };
    }},
    { id:'ufo', name:'UFO Hover', build(ac){
      const osc = ac.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = 200;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 6;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 40;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      const filter = ac.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1200;
      osc.connect(filter);
      return { output: filter, sources: [osc, lfo],
        update(speed){ osc.frequency.setTargetAtTime(150+speed*500, ac.currentTime, 0.06); lfo.frequency.setTargetAtTime(4+speed*14, ac.currentTime, 0.06); } };
    }},
    { id:'staticbuzz', name:'Static Buzz', build(ac){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 1500; filter.Q.value = 1.5;
      noise.connect(filter);
      return { output: filter, sources: [noise],
        update(speed){ filter.frequency.setTargetAtTime(800+speed*3000, ac.currentTime, 0.05); filter.Q.setTargetAtTime(1+speed*4, ac.currentTime, 0.05); } };
    }}
  ];

  // One-shot tick variants. play(ac, volume) fires immediately.
  const TICK_VARIANTS = [
    { id:'classic', name:'Classic Click', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'square'; osc.frequency.value = 1400;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.06);
      osc.start(t); osc.stop(t+0.07);
    }},
    { id:'digitalBeep', name:'Digital Beep', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine'; osc.frequency.value = 1800;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.05);
      osc.start(t); osc.stop(t+0.06);
    }},
    { id:'woodBlock', name:'Wood Block', play(ac, vol){
      const src = createNoiseSource(ac);
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 900; filter.Q.value = 3;
      const gain = ac.createGain();
      src.connect(filter); filter.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.05);
      src.start(t); src.stop(t+0.06);
    }},
    { id:'casinoClack', name:'Casino Clack', play(ac, vol){
      [[2000,0],[1500,0.03]].forEach(([freq,delay])=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'square'; osc.frequency.value = freq;
        osc.connect(gain); gain.connect(ac.destination);
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(vol*0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.04);
        osc.start(t); osc.stop(t+0.05);
      });
    }},
    { id:'laserZap', name:'Laser Zap', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sawtooth';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(2000, t);
      osc.frequency.exponentialRampToValueAtTime(200, t+0.08);
      gain.gain.setValueAtTime(vol*0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.09);
      osc.start(t); osc.stop(t+0.1);
    }},
    { id:'bubblePop', name:'Bubble Pop', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(250, t);
      osc.frequency.exponentialRampToValueAtTime(950, t+0.05);
      gain.gain.setValueAtTime(vol*0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.07);
      osc.start(t); osc.stop(t+0.08);
    }},
    { id:'marimba', name:'Marimba Tap', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine'; osc.frequency.value = 600;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.15);
      osc.start(t); osc.stop(t+0.16);
    }},
    { id:'snare', name:'Snare Hit', play(ac, vol){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=1800; filter.Q.value=1;
      const ngain = ac.createGain();
      noise.connect(filter); filter.connect(ngain); ngain.connect(ac.destination);
      const t = ac.currentTime;
      ngain.gain.setValueAtTime(vol*0.35, t);
      ngain.gain.exponentialRampToValueAtTime(0.0001, t+0.09);
      noise.start(t); noise.stop(t+0.1);
      const osc = ac.createOscillator(); const ogain = ac.createGain();
      osc.type = 'triangle'; osc.frequency.value = 180;
      osc.connect(ogain); ogain.connect(ac.destination);
      ogain.gain.setValueAtTime(vol*0.2, t);
      ogain.gain.exponentialRampToValueAtTime(0.0001, t+0.05);
      osc.start(t); osc.stop(t+0.06);
    }},
    { id:'xylophone', name:'Xylophone Ping', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine'; osc.frequency.value = 1300;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.12);
      osc.start(t); osc.stop(t+0.13);
    }},
    { id:'rimshot', name:'Rimshot', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'square'; osc.frequency.value = 2200;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.02);
      osc.start(t); osc.stop(t+0.03);
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type='highpass'; filter.frequency.value=2000;
      const ngain = ac.createGain();
      noise.connect(filter); filter.connect(ngain); ngain.connect(ac.destination);
      ngain.gain.setValueAtTime(vol*0.25, t);
      ngain.gain.exponentialRampToValueAtTime(0.0001, t+0.04);
      noise.start(t); noise.stop(t+0.05);
    }},
    { id:'metalTing', name:'Metal Ting', play(ac, vol){
      [1600,1620].forEach(f=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'triangle'; osc.frequency.value = f;
        osc.connect(gain); gain.connect(ac.destination);
        const t = ac.currentTime;
        gain.gain.setValueAtTime(vol*0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.2);
        osc.start(t); osc.stop(t+0.21);
      });
    }},
    { id:'softThump', name:'Soft Thump', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine'; osc.frequency.value = 150;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.08);
      osc.start(t); osc.stop(t+0.09);
    }},
    { id:'chirp', name:'Chirp', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1300, t+0.04);
      gain.gain.setValueAtTime(vol*0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.05);
      osc.start(t); osc.stop(t+0.06);
    }},
    { id:'waterDrop', name:'Water Drop', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(120, t+0.12);
      gain.gain.setValueAtTime(vol*0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.14);
      osc.start(t); osc.stop(t+0.15);
    }},
    { id:'typewriter', name:'Typewriter Key', play(ac, vol){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=3000; filter.Q.value=5;
      const gain = ac.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.025);
      noise.start(t); noise.stop(t+0.03);
    }},
    { id:'coinClink', name:'Coin Clink', play(ac, vol){
      [[3000,0],[2400,0.025]].forEach(([f,delay])=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'square'; osc.frequency.value = f;
        osc.connect(gain); gain.connect(ac.destination);
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(vol*0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.03);
        osc.start(t); osc.stop(t+0.04);
      });
    }},
    { id:'synthBlip', name:'Synth Blip', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'square';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(500, t);
      osc.frequency.exponentialRampToValueAtTime(1100, t+0.04);
      gain.gain.setValueAtTime(vol*0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.05);
      osc.start(t); osc.stop(t+0.06);
    }},
    { id:'glassTink', name:'Glass Tink', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine'; osc.frequency.value = 2400;
      const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 30;
      const lfoGain = ac.createGain(); lfoGain.gain.value = 40;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.18);
      lfo.start(t); lfo.stop(t+0.18);
      osc.start(t); osc.stop(t+0.19);
    }}
  ];

  // One-shot win-fanfare variants. play(ac, volume) fires immediately.
  const WIN_VARIANTS = [
    { id:'classicChime', name:'Classic Chime', play(ac, vol){
      [523.25,659.25,783.99,1046.5].forEach((f,i)=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'triangle'; osc.frequency.value = f;
        const t = ac.currentTime+i*0.12;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol*0.35, t+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.5);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.55);
      });
    }},
    { id:'brassFanfare', name:'Brass Fanfare', play(ac, vol){
      const chords = [[[261.63,329.63,392.00],0],[[349.23,440.00,523.25],0.28]];
      chords.forEach(([chord,delay])=>{
        chord.forEach(f=>{
          const osc = ac.createOscillator(); const gain = ac.createGain();
          osc.type = 'sawtooth'; osc.frequency.value = f;
          const t = ac.currentTime+delay;
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(vol*0.22, t+0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, t+0.45);
          osc.connect(gain); gain.connect(ac.destination);
          osc.start(t); osc.stop(t+0.5);
        });
      });
    }},
    { id:'audienceCheer', name:'Audience Cheer', play(ac, vol){
      const dur = 1.6;
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 700; filter.Q.value = 0.7;
      const gain = ac.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol*0.28, t+0.25);
      gain.gain.linearRampToValueAtTime(0.0001, t+dur);
      filter.frequency.setValueAtTime(700, t);
      filter.frequency.linearRampToValueAtTime(1800, t+dur*0.6);
      filter.frequency.linearRampToValueAtTime(900, t+dur);
      noise.start(t); noise.stop(t+dur+0.05);
      for(let i=0;i<10;i++){
        const delay = Math.random()*dur*0.8;
        const wOsc = ac.createOscillator(); const wGain = ac.createGain();
        wOsc.type = 'triangle';
        const startF = 300+Math.random()*300;
        const endF = startF + 200+Math.random()*300;
        const wt = t+delay;
        wOsc.frequency.setValueAtTime(startF, wt);
        wOsc.frequency.linearRampToValueAtTime(endF, wt+0.2);
        wGain.gain.setValueAtTime(0, wt);
        wGain.gain.linearRampToValueAtTime(vol*0.12, wt+0.03);
        wGain.gain.exponentialRampToValueAtTime(0.0001, wt+0.25);
        wOsc.connect(wGain); wGain.connect(ac.destination);
        wOsc.start(wt); wOsc.stop(wt+0.3);
      }
    }},
    { id:'jazzyRiff', name:'Jazzy Riff', play(ac, vol){
      [[311.13,0],[415.30,0.15],[466.16,0.30],[369.99,0.48]].forEach(([f,delay])=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'sine'; osc.frequency.value = f;
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol*0.3, t+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.3);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.32);
      });
    }},
    { id:'funkyStabs', name:'Funky Horn Stabs', play(ac, vol){
      const chord = [293.66,369.99,440.00];
      [0,0.18,0.42].forEach(delay=>{
        chord.forEach(f=>{
          const osc = ac.createOscillator(); const gain = ac.createGain();
          osc.type = 'square'; osc.frequency.value = f;
          const t = ac.currentTime+delay;
          gain.gain.setValueAtTime(vol*0.16, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t+0.12);
          osc.connect(gain); gain.connect(ac.destination);
          osc.start(t); osc.stop(t+0.13);
        });
      });
    }},
    { id:'sillyBoing', name:'Silly Boing', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(150, t+0.15);
      osc.frequency.exponentialRampToValueAtTime(500, t+0.28);
      osc.frequency.exponentialRampToValueAtTime(200, t+0.42);
      osc.frequency.exponentialRampToValueAtTime(350, t+0.55);
      gain.gain.setValueAtTime(vol*0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.65);
      osc.start(t); osc.stop(t+0.7);
    }},
    { id:'wowTada', name:'Wow! Ta-da', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      const lfo = ac.createOscillator(); const lfoGain = ac.createGain();
      osc.type = 'sawtooth';
      lfo.type = 'sine'; lfo.frequency.value = 14; lfoGain.gain.value = 12;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1100, t+0.3);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol*0.3, t+0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.6);
      lfo.start(t); lfo.stop(t+0.6);
      osc.start(t); osc.stop(t+0.6);
    }},
    { id:'eightBit', name:'8-Bit Victory', play(ac, vol){
      [523.25,659.25,783.99,1046.5,783.99,1046.5].forEach((f,i)=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'square'; osc.frequency.value = f;
        const t = ac.currentTime+i*0.09;
        gain.gain.setValueAtTime(vol*0.18, t);
        gain.gain.setValueAtTime(0, t+0.08);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.085);
      });
    }},
    { id:'drumrollCymbal', name:'Drumroll & Cymbal', play(ac, vol){
      const hits = 14;
      for(let i=0;i<hits;i++){
        const delay = i*0.045;
        const src = createNoiseSource(ac);
        const filter = ac.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=250; filter.Q.value=1;
        const gain = ac.createGain();
        src.connect(filter); filter.connect(gain); gain.connect(ac.destination);
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(vol*(0.08+i*0.01), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.04);
        src.start(t); src.stop(t+0.05);
      }
      const crashDelay = hits*0.045;
      const crash = createNoiseSource(ac);
      const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
      const cGain = ac.createGain();
      crash.connect(hp); hp.connect(cGain); cGain.connect(ac.destination);
      const ct = ac.currentTime+crashDelay;
      cGain.gain.setValueAtTime(vol*0.3, ct);
      cGain.gain.exponentialRampToValueAtTime(0.0001, ct+0.9);
      crash.start(ct); crash.stop(ct+0.95);
    }},
    { id:'fireworks', name:'Fireworks Burst', play(ac, vol){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=2000;
      const gain = ac.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.35);
      noise.start(t); noise.stop(t+0.4);
      for(let i=0;i<8;i++){
        const delay = 0.1+Math.random()*0.9;
        const osc = ac.createOscillator(); const g = ac.createGain();
        osc.type = 'sine';
        const f = 800+Math.random()*1200;
        const wt = t+delay;
        osc.frequency.setValueAtTime(f, wt);
        osc.frequency.exponentialRampToValueAtTime(f*0.4, wt+0.3);
        g.gain.setValueAtTime(vol*0.18, wt);
        g.gain.exponentialRampToValueAtTime(0.0001, wt+0.35);
        osc.connect(g); g.connect(ac.destination);
        osc.start(wt); osc.stop(wt+0.4);
      }
    }},
    { id:'royalTrumpets', name:'Royal Trumpets', play(ac, vol){
      [[392.00,0],[392.00,0.14],[523.25,0.28],[659.25,0.55]].forEach(([f,delay])=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'sawtooth'; osc.frequency.value = f;
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol*0.28, t+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.4);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.45);
      });
    }},
    { id:'discoSparkle', name:'Disco Sparkle', play(ac, vol){
      [261.63,329.63,392.00,523.25,659.25].forEach((f,i)=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'sawtooth'; osc.frequency.value = f;
        const t = ac.currentTime+i*0.07;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol*0.22, t+0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.2);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.22);
      });
    }},
    { id:'magicSparkle', name:'Magic Sparkle', play(ac, vol){
      for(let i=0;i<12;i++){
        const delay = i*0.045;
        const f = 800+Math.random()*1600;
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'sine'; osc.frequency.value = f;
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(vol*0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.15);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.16);
      }
    }},
    { id:'gameShowDing', name:'Game Show Ding Ding', play(ac, vol){
      [[880,0],[1174.66,0.18],[880,0.4],[1174.66,0.58]].forEach(([f,delay])=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'sine'; osc.frequency.value = f;
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(vol*0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.16);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.17);
      });
    }},
    { id:'triumphantHorns', name:'Triumphant Horns', play(ac, vol){
      [[[196.00,246.94,293.66],0],[[220.00,277.18,329.63],0.25],[[261.63,329.63,392.00],0.5]].forEach(([chord,delay])=>{
        chord.forEach(f=>{
          const osc = ac.createOscillator(); const gain = ac.createGain();
          osc.type = 'sawtooth'; osc.frequency.value = f;
          const t = ac.currentTime+delay;
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(vol*0.18, t+0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, t+0.4);
          osc.connect(gain); gain.connect(ac.destination);
          osc.start(t); osc.stop(t+0.45);
        });
      });
    }},
    { id:'partyHorn', name:'Party Horn', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      const lfo = ac.createOscillator(); const lfoGain = ac.createGain();
      osc.type = 'sawtooth';
      lfo.type = 'sine'; lfo.frequency.value = 18; lfoGain.gain.value = 25;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(250, t);
      osc.frequency.linearRampToValueAtTime(500, t+0.5);
      gain.gain.setValueAtTime(vol*0.25, t);
      gain.gain.linearRampToValueAtTime(vol*0.2, t+0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.65);
      lfo.start(t); lfo.stop(t+0.65);
      osc.start(t); osc.stop(t+0.7);
    }},
    { id:'levelUp', name:'Level Up', play(ac, vol){
      [392.00,440.00,493.88,523.25,587.33,659.25,698.46,783.99].forEach((f,i)=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'square'; osc.frequency.value = f;
        const t = ac.currentTime+i*0.05;
        gain.gain.setValueAtTime(vol*0.15, t);
        gain.gain.setValueAtTime(0, t+0.045);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.05);
      });
    }},
    { id:'applause', name:'Applause', play(ac, vol){
      const dur = 1.4;
      for(let i=0;i<40;i++){
        const delay = Math.random()*dur;
        const noise = createNoiseSource(ac);
        const filter = ac.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=2000+Math.random()*1500; filter.Q.value=2;
        const gain = ac.createGain();
        noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
        const t = ac.currentTime+delay;
        gain.gain.setValueAtTime(vol*(0.08+Math.random()*0.08), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.03);
        noise.start(t); noise.stop(t+0.04);
      }
    }},
    { id:'bellChoir', name:'Bell Choir', play(ac, vol){
      [523.25,659.25,783.99].forEach((f,i)=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'triangle'; osc.frequency.value = f;
        const t = ac.currentTime+i*0.08;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol*0.25, t+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+1.1);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+1.15);
      });
    }},
    { id:'retroCoinCombo', name:'Retro Coin Combo', play(ac, vol){
      for(let i=0;i<6;i++){
        const t = ac.currentTime+i*0.09;
        [988,1568].forEach((f,j)=>{
          const osc = ac.createOscillator(); const gain = ac.createGain();
          osc.type = 'square'; osc.frequency.value = f;
          const nt = t+j*0.045;
          gain.gain.setValueAtTime(vol*0.14, nt);
          gain.gain.exponentialRampToValueAtTime(0.0001, nt+0.06);
          osc.connect(gain); gain.connect(ac.destination);
          osc.start(nt); osc.stop(nt+0.07);
        });
      }
    }}
  ];

  // One-shot spin-start variants. play(ac, volume) fires immediately, same shape as TICK_VARIANTS.
  const SPIN_START_VARIANTS = [
    { id:'quickWhoosh', name:'Quick Whoosh', play(ac, vol){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'bandpass'; filter.Q.value = 0.9;
      const gain = ac.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      filter.frequency.setValueAtTime(300, t);
      filter.frequency.exponentialRampToValueAtTime(2400, t+0.22);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol*0.32, t+0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.26);
      noise.start(t); noise.stop(t+0.28);
    }},
    { id:'powerUp', name:'Power Up', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'sawtooth';
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(720, t+0.3);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol*0.28, t+0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.32);
      osc.start(t); osc.stop(t+0.33);
    }},
    { id:'countIn', name:'Count-In Beeps', play(ac, vol){
      [660,660,880].forEach((f,i)=>{
        const osc = ac.createOscillator(); const gain = ac.createGain();
        osc.type = 'sine'; osc.frequency.value = f;
        const t = ac.currentTime+i*0.13;
        gain.gain.setValueAtTime(vol*0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t+0.09);
        osc.connect(gain); gain.connect(ac.destination);
        osc.start(t); osc.stop(t+0.1);
      });
    }},
    { id:'snapClick', name:'Snap Click', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      osc.type = 'square'; osc.frequency.value = 2200;
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.045);
      osc.start(t); osc.stop(t+0.05);
    }},
    { id:'risingSweep', name:'Rising Sweep', play(ac, vol){
      const osc = ac.createOscillator(); const gain = ac.createGain();
      const lfo = ac.createOscillator(); const lfoGain = ac.createGain();
      osc.type = 'triangle';
      lfo.type = 'sine'; lfo.frequency.value = 22; lfoGain.gain.value = 18;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      osc.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(880, t+0.35);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol*0.3, t+0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.4);
      lfo.start(t); lfo.stop(t+0.4);
      osc.start(t); osc.stop(t+0.42);
    }},
    { id:'drumHit', name:'Drum Hit', play(ac, vol){
      const noise = createNoiseSource(ac);
      const filter = ac.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 350;
      const gain = ac.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
      const t = ac.currentTime;
      gain.gain.setValueAtTime(vol*0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t+0.16);
      noise.start(t); noise.stop(t+0.18);
      const osc = ac.createOscillator(); const oGain = ac.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(140, t); osc.frequency.exponentialRampToValueAtTime(50, t+0.15);
      osc.connect(oGain); oGain.connect(ac.destination);
      oGain.gain.setValueAtTime(vol*0.4, t);
      oGain.gain.exponentialRampToValueAtTime(0.0001, t+0.18);
      osc.start(t); osc.stop(t+0.2);
    }}
  ];

  const VARIANT_SETS = { music: MUSIC_VARIANTS, tick: TICK_VARIANTS, win: WIN_VARIANTS, spinStart: SPIN_START_VARIANTS };
  function getVariant(key){
    const list = VARIANT_SETS[key];
    return list.find(v=>v.id===state.sound.variant[key]) || list[0];
  }

  function id(){ return Math.random().toString(36).slice(2,10); }

  /* ============================ STORAGE ============================ */
  async function loadAll(){
    try{
      const s = await window.storage.get('app-state');
      if(s && s.value){ Object.assign(state, JSON.parse(s.value)); }
    }catch(e){ /* no saved state yet */ }
    try{
      const s = await window.storage.get('saved-wheels');
      if(s && s.value){ savedWheels = JSON.parse(s.value); }
    }catch(e){ savedWheels = {}; }
    try{
      const s = await window.storage.get('history');
      if(s && s.value){ history = JSON.parse(s.value); }
      history.forEach(h=>{ if(!h.id) h.id = id(); });
    }catch(e){ history = []; }
    try{
      // Each clip lives in its own storage key (custom-clip:<id>) so a single large
      // clip never has to compete with others for the 5MB-per-key ceiling. This
      // index just tracks which clip ids belong to which sound category.
      const idx = await window.storage.get('custom-sound-index');
      if(idx && idx.value){
        const parsed = JSON.parse(idx.value);
        for(const d of SOUND_DEFS){
          const metas = parsed[d.key] || [];
          customSounds[d.key] = [];
          for(const meta of metas){
            try{
              const clipRes = await window.storage.get('custom-clip:'+meta.id);
              if(clipRes && clipRes.value){
                customSounds[d.key].push({ id: meta.id, name: meta.name, size: meta.size, dataURL: JSON.parse(clipRes.value) });
              }
            }catch(e){ /* this one clip is missing/corrupt — skip it */ }
          }
        }
      } else {
        // migrate from the older single-key save format, if present
        const legacy = await window.storage.get('custom-sounds');
        if(legacy && legacy.value){
          const raw = JSON.parse(legacy.value);
          SOUND_DEFS.forEach(d=>{
            const v = raw[d.key];
            let clips = [];
            if(Array.isArray(v)) clips = v;
            else if(v && v.dataURL) clips = [v];
            customSounds[d.key] = clips.map(c=> ({ id: c.id || id(), name: c.name, size: c.size, dataURL: c.dataURL }));
          });
          await persistClipIndex();
          for(const d of SOUND_DEFS){ for(const clip of customSounds[d.key]){ await persistClip(clip); } }
          try{ await window.storage.delete('custom-sounds'); }catch(e){ /* not critical */ }
        }
      }
    }catch(e){ /* none saved yet */ }
    try{
      const s = await window.storage.get('custom-palettes');
      if(s && s.value){ customPalettes = JSON.parse(s.value); }
    }catch(e){ customPalettes = {}; }
    await preloadItemImages(state.items);
    await preloadItemWinSounds(state.items);
    backfillState();
  }

  // Fills in fields that might be missing from state saved by an older version of the
  // app (or from an imported backup that predates a newer setting). Shared by loadAll()
  // on startup and by importSettings() so both paths land on a fully-valid state.
  function backfillState(){
    if(!state.sound.source) state.sound.source = { music:'generated', tick:'generated', win:'generated', spinStart:'generated' };
    if(!state.sound.variant) state.sound.variant = { music:'classic', tick:'classic', win:'classicChime', spinStart:'quickWhoosh' };
    if(typeof state.sound.spinStart !== 'boolean') state.sound.spinStart = true;
    if(typeof state.sound.duckOnWin !== 'boolean') state.sound.duckOnWin = false;
    if(typeof state.sound.duckLevel !== 'number') state.sound.duckLevel = 0.3;
    if(typeof state.sound.recencyWeighted !== 'boolean') state.sound.recencyWeighted = true;
    if(typeof state.sound.normalizeCustom !== 'boolean') state.sound.normalizeCustom = true;
    if(typeof state.sound.normalizeTargetPeak !== 'number') state.sound.normalizeTargetPeak = 0.85;
    // migrate from the older single-knob volume format, if present
    if(!state.sound.volumes){
      const legacyVol = typeof state.sound.volume === 'number' ? state.sound.volume : 0.7;
      state.sound.volumes = { music: legacyVol*0.4, tick: legacyVol*0.7, win: legacyVol*0.8 };
    }
    delete state.sound.volume;
    SOUND_DEFS.forEach(d=>{
      if(typeof state.sound.volumes[d.key] !== 'number') state.sound.volumes[d.key] = 0.5;
    });
    if(state.settings.wheelStyle !== 'wheel' && state.settings.wheelStyle !== 'slot') state.settings.wheelStyle = 'wheel';
    if(typeof state.settings.nearMiss !== 'boolean') state.settings.nearMiss = false;
    if(typeof state.settings.slotLabelCharLimit !== 'number') state.settings.slotLabelCharLimit = 24;
    if(typeof state.settings.slotLabelFontSize !== 'number') state.settings.slotLabelFontSize = 26;
    if(typeof state.settings.randomizeAngle !== 'boolean') state.settings.randomizeAngle = false;
    if(typeof state.settings.labelCharLimit !== 'number') state.settings.labelCharLimit = 32;
    if(typeof state.settings.labelOverflow !== 'boolean') state.settings.labelOverflow = false;
    if(typeof state.settings.labelRawSize !== 'number') state.settings.labelRawSize = 17;
    if(typeof state.settings.idleSpin !== 'boolean') state.settings.idleSpin = true;
    if(!state.settings.bannerImageLayout) state.settings.bannerImageLayout = 'left';
    if(!state.settings.bannerImageFit) state.settings.bannerImageFit = 'contain';
    if(!state.settings.wheelTitleFont || !TITLE_FONTS.find(f=>f.id===state.settings.wheelTitleFont)) state.settings.wheelTitleFont = 'fraunces';
    if(typeof state.settings.wheelTitleSize !== 'number') state.settings.wheelTitleSize = 26;
    if(typeof state.settings.bannerImageOpacity !== 'number') state.settings.bannerImageOpacity = 1;
    state.settings.duration = Math.min(30, Math.max(2, Math.round(state.settings.duration)));
    SOUND_DEFS.forEach(d=>{
      if(!state.sound.source[d.key]) state.sound.source[d.key] = 'generated';
      if(!state.sound.variant[d.key]) state.sound.variant[d.key] = VARIANT_SETS[d.key][0].id;
      // a custom source with no uploaded clips (e.g. cleared elsewhere) falls back to generated
      if(state.sound.source[d.key] === 'custom' && (!customSounds[d.key] || customSounds[d.key].length === 0)){
        state.sound.source[d.key] = 'generated';
      }
    });
    // show whichever theme group contains the active palette, so it's not hidden on load
    uiPaletteGroup = findGroupForPalette(state.paletteName) || (customPalettes[state.paletteName] ? 'My Palettes' : 'Vibrant');
  }

  let saveTimer = null;
  function persistState(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async ()=>{
      try{ await window.storage.set('app-state', JSON.stringify(state)); }catch(e){ console.error('save failed', e); }
    }, 300);
  }
  async function persistSavedWheels(){
    try{ await window.storage.set('saved-wheels', JSON.stringify(savedWheels)); }catch(e){ console.error('save failed', e); }
  }
  async function persistHistory(){
    try{ await window.storage.set('history', JSON.stringify(history)); }catch(e){ console.error('save failed', e); }
  }
  async function persistClipIndex(){
    const index = {};
    SOUND_DEFS.forEach(d=>{
      index[d.key] = (customSounds[d.key]||[]).map(c=> ({ id: c.id, name: c.name, size: c.size }));
    });
    try{ await window.storage.set('custom-sound-index', JSON.stringify(index)); }
    catch(e){ console.error('save failed', e); flashMessage('Could not save your clip list.', 'Notice'); }
  }
  async function persistClip(clip){
    try{ await window.storage.set('custom-clip:'+clip.id, JSON.stringify(clip.dataURL)); return true; }
    catch(e){ console.error('save failed', e); flashMessage(`Could not save "${clip.name}" — try a smaller file.`, 'Notice'); return false; }
  }
  async function deleteClipStorage(clipId){
    try{ await window.storage.delete('custom-clip:'+clipId); }catch(e){ /* not critical */ }
  }
  // Looks up a clip's audio data by id wherever it currently lives — the in-memory
  // pool for the active session first (fast path), then falls back to its own
  // storage key. Used when resolving a saved wheel's clip references back into
  // playable clips, and when building a full settings export.
  async function fetchClipDataURL(clipId){
    for(const key of Object.keys(customSounds)){
      const hit = (customSounds[key]||[]).find(c=> c.id === clipId);
      if(hit) return hit.dataURL;
    }
    try{
      const res = await window.storage.get('custom-clip:'+clipId);
      return (res && res.value) ? JSON.parse(res.value) : null;
    }catch(e){ return null; }
  }
  async function persistCustomPalettes(){
    try{ await window.storage.set('custom-palettes', JSON.stringify(customPalettes)); }catch(e){ console.error('save failed', e); flashMessage('Could not save that palette.', 'Notice'); }
  }
  async function persistItemImage(itemId, dataURL){
    try{ await window.storage.set('item-image:'+itemId, JSON.stringify(dataURL)); return true; }
    catch(e){ console.error('save failed', e); flashMessage('Could not save that image — try a smaller file.', 'Notice'); return false; }
  }
  async function deleteItemImageStorage(itemId){
    try{ await window.storage.delete('item-image:'+itemId); }catch(e){ /* not critical */ }
  }
  async function preloadItemImages(items){
    for(const item of items){
      if(item.image && !(item.id in itemImages)){
        try{
          const res = await window.storage.get('item-image:'+item.id);
          itemImages[item.id] = (res && res.value) ? JSON.parse(res.value) : null;
        }catch(e){ itemImages[item.id] = null; }
      }
    }
  }
  async function persistItemWinSound(itemId, dataURL){
    try{ await window.storage.set('item-win-sound:'+itemId, JSON.stringify(dataURL)); return true; }
    catch(e){ console.error('save failed', e); flashMessage('Could not save that sound — try a smaller file.', 'Notice'); return false; }
  }
  async function deleteItemWinSoundStorage(itemId){
    try{ await window.storage.delete('item-win-sound:'+itemId); }catch(e){ /* not critical */ }
  }
  async function preloadItemWinSounds(items){
    for(const item of items){
      if(item.winSound && !(item.id in itemWinSounds)){
        try{
          const res = await window.storage.get('item-win-sound:'+item.id);
          itemWinSounds[item.id] = (res && res.value) ? JSON.parse(res.value) : null;
        }catch(e){ itemWinSounds[item.id] = null; }
        if(itemWinSounds[item.id]) await decodeItemWinSoundBuffer(item.id);
      }
    }
  }

  /* ============================ ELEMENTS ============================ */
  const el = {
    stageModeBtns: Array.from(document.querySelectorAll('.stage-mode-btn')),
    nearMiss: document.getElementById('nearMiss'),
    wheelWrap: document.getElementById('wheelWrap'),
    slotWrap: document.getElementById('slotWrap'),
    slotWindow: document.getElementById('slotWindow'),
    slotPayline: document.getElementById('slotPayline'),
    slotSpinBtn: document.getElementById('slotSpinBtn'),
    slotStrips: [document.getElementById('slotStrip0')],
    stageFoot: document.getElementById('stageFoot'),
    titleFontSelect: document.getElementById('titleFontSelect'),
    wheelTitleSizeRange: document.getElementById('wheelTitleSizeRange'),
    wheelTitleSizeVal: document.getElementById('wheelTitleSizeVal'),
    wheelName: document.getElementById('wheelNameInput'),
    newWheelBtn: document.getElementById('newWheelBtn'),
    itemsList: document.getElementById('itemsList'),
    addItemBtn: document.getElementById('addItemBtn'),
    shuffleBtn: document.getElementById('shuffleBtn'),
    clearItemsBtn: document.getElementById('clearItemsBtn'),
    batchInput: document.getElementById('batchInput'),
    batchAppendBtn: document.getElementById('batchAppendBtn'),
    batchUpdateBtn: document.getElementById('batchUpdateBtn'),
    batchReplaceBtn: document.getElementById('batchReplaceBtn'),
    batchSummary: document.getElementById('batchSummary'),
    durationRange: document.getElementById('durationRange'),
    durationVal: document.getElementById('durationVal'),
    spinsRange: document.getElementById('spinsRange'),
    spinsVal: document.getElementById('spinsVal'),
    angleRange: document.getElementById('angleRange'),
    angleVal: document.getElementById('angleVal'),
    randomizeAngle: document.getElementById('randomizeAngle'),
    idleSpin: document.getElementById('idleSpin'),
    easingSelect: document.getElementById('easingSelect'),
    labelLimitRange: document.getElementById('labelLimitRange'),
    labelLimitVal: document.getElementById('labelLimitVal'),
    labelRawSizeRange: document.getElementById('labelRawSizeRange'),
    labelRawSizeVal: document.getElementById('labelRawSizeVal'),
    labelOverflow: document.getElementById('labelOverflow'),
    slotLabelLimitRange: document.getElementById('slotLabelLimitRange'),
    slotLabelLimitVal: document.getElementById('slotLabelLimitVal'),
    slotLabelSizeRange: document.getElementById('slotLabelSizeRange'),
    slotLabelSizeVal: document.getElementById('slotLabelSizeVal'),
    bannerImageLayout: document.getElementById('bannerImageLayout'),
    bannerImageFit: document.getElementById('bannerImageFit'),
    bannerImageOpacityRange: document.getElementById('bannerImageOpacityRange'),
    bannerImageOpacityVal: document.getElementById('bannerImageOpacityVal'),
    bannerRibbon: document.getElementById('bannerRibbon'),
    bannerSideImage: document.getElementById('bannerSideImage'),
    bannerBgImage: document.getElementById('bannerBgImage'),
    paletteGroupSelect: document.getElementById('paletteGroupSelect'),
    paletteSourceNote: document.getElementById('paletteSourceNote'),
    paletteGrid: document.getElementById('paletteGrid'),
    customPaletteName: document.getElementById('customPaletteName'),
    customPaletteColors: document.getElementById('customPaletteColors'),
    addPaletteColorBtn: document.getElementById('addPaletteColorBtn'),
    savePaletteBtn: document.getElementById('savePaletteBtn'),
    soundRows: document.getElementById('soundRows'),
    recencyWeightToggle: document.getElementById('recencyWeightToggle'),
    normalizeCustomToggle: document.getElementById('normalizeCustomToggle'),
    normalizeTargetBody: document.getElementById('normalizeTargetBody'),
    normalizeTargetRange: document.getElementById('normalizeTargetRange'),
    normalizeTargetVal: document.getElementById('normalizeTargetVal'),
    saveNameInput: document.getElementById('saveNameInput'),
    saveWheelBtn: document.getElementById('saveWheelBtn'),
    savedList: document.getElementById('savedList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    exportSettingsBtn: document.getElementById('exportSettingsBtn'),
    importSettingsBtn: document.getElementById('importSettingsBtn'),
    importSettingsFile: document.getElementById('importSettingsFile'),
    historyList: document.getElementById('historyList'),
    tallyBox: document.getElementById('tallyBox'),
    canvas: document.getElementById('wheelCanvas'),
    spinBtn: document.getElementById('spinBtn'),
    winnerBanner: document.getElementById('winnerBanner'),
    winnerBannerClose: document.getElementById('winnerBannerClose'),
    bannerLabel: document.getElementById('bannerLabel'),
    winnerText: document.getElementById('winnerText'),
    confetti: document.getElementById('confettiCanvas')
  };
  const ctx = el.canvas.getContext('2d');

  /* ============================ TABS ============================ */
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
      if(btn.dataset.tab === 'history') renderHistory();
      if(btn.dataset.tab === 'saved') renderSaved();
    });
  });

  // Settings tab has its own sub-pages (Wheel / Winner banner / Colors) so no
  // single page needs much scrolling — this also keeps the sidebar panel from
  // growing tall enough to push the wheel out of view.
  document.querySelectorAll('.subtab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.subtab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.settings-page').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.settings-page[data-page="${btn.dataset.page}"]`).classList.add('active');
      // scroll this tab's content back to the top when switching sub-pages
      const panels = document.querySelector('#tab-settings').closest('.tab-panels');
      if(panels) panels.scrollTop = 0;
    });
  });

  /* ============================ WHEEL MATH ============================ */
  function totalWeight(){ return state.items.reduce((s,i)=> s + Math.max(0, Number(i.weight)||0), 0); }

  function findGroupForPalette(name){
    for(const g of Object.keys(PALETTE_GROUPS)){
      if(PALETTE_GROUPS[g][name]) return g;
    }
    return null;
  }
  function allBuiltInPalettes(){
    const flat = {};
    Object.values(PALETTE_GROUPS).forEach(g=> Object.assign(flat, g));
    return flat;
  }
  function paletteColors(){
    if(customPalettes[state.paletteName]) return customPalettes[state.paletteName];
    return allBuiltInPalettes()[state.paletteName] || DEFAULT_PALETTE;
  }

  // Default colors follow each item's position in the list, cycling through the
  // palette — this keeps the wheel's color rhythm even and predictable. Shuffle
  // still visibly reorders things because it's guaranteed to change the order
  // (see fisherYatesShuffle below) and the label in each colored slice changes.
  function colorFor(item, index){
    if(item.color) return item.color;
    const p = paletteColors();
    return p[index % p.length];
  }

  // cumulative boundaries (degrees, clockwise from top / pointer position), 0..360
  function segmentGeometry(){
    const tw = totalWeight();
    const segs = [];
    let acc = 0;
    if(tw <= 0){ return segs; }
    state.items.forEach((item, idx)=>{
      const w = Math.max(0, Number(item.weight)||0);
      const sweep = (w/tw) * 360;
      segs.push({ item, index: idx, start: acc, end: acc + sweep, color: colorFor(item, idx) });
      acc += sweep;
    });
    return segs;
  }

  /* ============================ DRAW ============================ */
  let currentRotation = 0; // degrees, accumulates forever

  const IDLE_SPIN_DEG_PER_SEC = 6; // slow, ~1 full turn per minute — looks-only
  const MIN_LABEL_FONT_SIZE = 8;   // was 7
  let idleRafId = null;
  let idleLastTime = null;
  function idleSpinFrame(now){
    if(!state.settings.idleSpin || spinning || state.settings.wheelStyle === 'slot'){
      idleRafId = null; idleLastTime = null;
      return;
    }
    if(idleLastTime == null) idleLastTime = now;
    const dt = (now - idleLastTime) / 1000;
    idleLastTime = now;
    currentRotation += IDLE_SPIN_DEG_PER_SEC * dt;
    drawWheel();
    idleRafId = requestAnimationFrame(idleSpinFrame);
  }
  function startIdleSpin(){
    if(idleRafId != null || !state.settings.idleSpin || spinning || state.settings.wheelStyle === 'slot') return;
    idleLastTime = null;
    idleRafId = requestAnimationFrame(idleSpinFrame);
  }
  function stopIdleSpin(){
    if(idleRafId != null){ cancelAnimationFrame(idleRafId); idleRafId = null; }
    idleLastTime = null;
  }

  function fitCanvas(){
    const wrap = el.canvas.parentElement;
    const size = wrap.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    el.canvas.width = size * dpr;
    el.canvas.height = size * dpr;
    el.canvas.style.width = size + 'px';
    el.canvas.style.height = size + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    drawWheel();
  }

  // Per-label font sizing (the expensive part — it involves a
  // ctx.measureText() shrink-loop) only depends on an item's own id/label/
  // weight, its slice's angular sweep, and label-related settings — never
  // on rotation or color. But drawWheel() runs on every single animation
  // frame during idle spin and real spins, where rotation is the only thing
  // actually changing. Recomputing that shrink-loop 60 times a second for
  // data that hasn't changed was pure waste, and got worse once "fit to
  // slice" widened the possible font range. This cache eliminates it: font
  // size is computed once per item when something relevant to IT changes,
  // and every rotation-only redraw just reuses it. Geometry and color are
  // deliberately NOT cached — they're cheap, and always need to reflect the
  // current palette/custom colors immediately, with no risk of going stale.
  const labelSizeCache = new Map(); // item.id -> { key, label, fontSize, labelRadius }

  function getWheelLayout(){
    const size = el.canvas.clientWidth;
    const r = size/2 - 8;
    const segs = segmentGeometry(); // always fresh: correct color every time, and cheap to compute
    const settingsKey = state.settings.labelCharLimit + '::' + state.settings.labelRawSize + '::' + state.settings.labelOverflow + '::' + size;

    segs.forEach(seg=>{
      const sweepDeg = seg.end - seg.start;
      const labelRadius = r*0.62;
      const itemKey = seg.item.id + ':' + seg.item.label + ':' + seg.item.weight + ':' + sweepDeg.toFixed(3) + '::' + settingsKey;

      const cached = labelSizeCache.get(seg.item.id);
      if(cached && cached.key === itemKey){
        seg.label = cached.label;
        seg.fontSize = cached.fontSize;
        seg.labelRadius = cached.labelRadius;
        seg.skipClip = cached.skipClip;
        return;
      }

      const label = truncate(seg.item.label || '—', state.settings.labelCharLimit);
      let fontSize, skipClip;

      if(state.settings.labelOverflow){
        // Manual mode: render at exactly the raw size the user chose, every
        // time, with no automatic shrinking and no per-slice clip — text is
        // free to spill into neighboring slices or past the rim. This trades
        // away the earlier anti-overflow guarantees on purpose, in exchange
        // for full manual control over how legible a packed wheel looks.
        fontSize = state.settings.labelRawSize;
        skipClip = true;
      } else {
        // Contained mode (default): same raw size as the target, but a
        // length-based reduction for long names, then shrunk further (using
        // real measured width, not a guess) until it actually fits this
        // specific slice's available arc — this is what keeps thin slices
        // from overflowing into neighbors regardless of label length.
        const baseFontSize = state.settings.labelRawSize;
        fontSize = label.length <= 12 ? baseFontSize
          : baseFontSize * Math.max(0.5, 1 - (label.length-12)*0.03);

        const availableArc = 2*Math.PI*labelRadius*(sweepDeg/360) * 0.86; // ~14% padding
        ctx.font = `600 ${fontSize}px Manrope`;
        const minFont = MIN_LABEL_FONT_SIZE;
        while(ctx.measureText(label).width > availableArc && fontSize > minFont){
          fontSize -= 0.5;
          ctx.font = `600 ${fontSize}px Manrope`;
        }
        // the loop's floor check happens BEFORE each decrement, so the
        // decrement itself can overshoot past minFont in that same step —
        // clamp it back so the floor is always exactly minFont, consistently.
        if(fontSize < minFont){
          fontSize = minFont;
          ctx.font = `600 ${fontSize}px Manrope`;
        }
        skipClip = false;
      }

      seg.label = label;
      seg.fontSize = fontSize;
      seg.labelRadius = labelRadius;
      seg.skipClip = skipClip;
      labelSizeCache.set(seg.item.id, { key: itemKey, label, fontSize, labelRadius, skipClip });
    });

    return { r, segs };
  }

  function drawWheel(){
    updateSpinButtonsVisibility();
    if(state.settings.wheelStyle === 'slot'){
      if(!slotSpinning) renderSlotIdle();
      return;
    }
    const size = el.canvas.clientWidth;
    const cx = size/2, cy = size/2;
    ctx.clearRect(0,0,size,size);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(deg2rad(currentRotation + state.settings.angle));

    const { r, segs } = getWheelLayout();

    if(segs.length === 0){
      ctx.beginPath();
      ctx.arc(0,0,r,0,Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '14px Manrope';
      ctx.textAlign = 'center';
      ctx.fillText('Add items to build your wheel', cx, cy);
      return;
    }

    // Two passes: every slice's fill+stroke first, then every label on top.
    // This matters once "allow overflow" is on — a segment's spilling text
    // needs to sit above ALL fills, not just the ones drawn before it in
    // segment order, or overflow would only be visible in one direction.
    segs.forEach(seg=>{
      const a0 = deg2rad(seg.start - 90); // -90 so 0deg (top) draws correctly before rotation applied
      const a1 = deg2rad(seg.end - 90);
      seg._a0 = a0; seg._a1 = a1;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.arc(0,0,r,a0,a1);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(20,18,31,0.55)';
      ctx.stroke();
    });

    segs.forEach(seg=>{
      // label — always rotated to the slice's own radial mid-angle, with no
      // extra offset and no per-half correction. At the wheel's 3 o'clock
      // mark (mid = 0) this is plain horizontal text, legible left to right;
      // the same single formula carries around the rest of the wheel with
      // nothing conditional, so there's no seam where direction flips
      // depending which side of the wheel a slice happens to land on.
      const mid = deg2rad((seg.start+seg.end)/2 - 90);
      ctx.save();
      if(!seg.skipClip){
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.arc(0,0,r,seg._a0,seg._a1);
        ctx.closePath();
        ctx.clip();
      }

      ctx.rotate(mid);
      ctx.translate(seg.labelRadius, 0);
      ctx.fillStyle = readableTextColor(seg.color);
      ctx.font = `600 ${seg.fontSize}px Manrope`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(seg.label, 0, 0);
      ctx.restore();
    });

    // outer ring
    ctx.beginPath();
    ctx.arc(0,0,r,0,Math.PI*2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(232,179,76,0.55)';
    ctx.stroke();

    ctx.restore();
  }

  function readableTextColor(hex){
    const c = hexToRgb(hex);
    if(!c) return '#14121f';
    const lum = (0.299*c.r + 0.587*c.g + 0.114*c.b)/255;
    return lum > 0.6 ? '#14121f' : '#f3ecdf';
  }
  function hexToRgb(hex){
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) } : null;
  }
  function deg2rad(d){ return d * Math.PI / 180; }
  function truncate(s, n){ return s.length > n ? s.slice(0,n-1)+'…' : s; }

  /* ============================ SLOT MACHINE ============================ */
  // An alternate affordance for the exact same pick: instead of a spinning
  // wheel, a single reel of item "symbols" scrolls and lands on the
  // weighted-random winner. Odds, sounds, history, and the winner banner are
  // all shared with the wheel — only how the result is revealed differs.
  const SLOT_REEL_COUNT = 1;
  const SLOT_VISIBLE_ROWS = 3; // rows visible in the reel; the middle one is the payline
  const SLOT_LOOPS = 6;        // how many full shuffled passes the reel scrolls through before landing

  let slotSpinning = false;
  let slotCancelRequested = false;
  let slotRafId = null;

  function shuffledCopy(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  function slotWeightedPool(){
    return state.items.filter(it=> (Math.max(0, Number(it.weight)||0)) > 0);
  }

  // The wheel never shows two adjacent slices in the same color, because
  // slices are laid out in item order and the palette only repeats every
  // Nth item. The reel's content is shuffled, though, so nothing stops two
  // items that happen to land on the same cycled palette color — or even
  // the same item, recurring across separate shuffled passes — from
  // landing right next to each other, or one row apart within the 3-row
  // window that's actually visible at once.
  function buildColorMap(){
    const map = new Map();
    state.items.forEach((it, idx)=> map.set(it, colorFor(it, idx)));
    return map;
  }

  // True if position i's color doesn't collide with either of the two
  // positions on each side of it — i.e. it wouldn't repeat within any
  // 3-row window that could ever be visible in the reel.
  function positionOk(seq, colorMap, i){
    const c = colorMap.get(seq[i]);
    if(i-1>=0 && colorMap.get(seq[i-1])===c) return false;
    if(i-2>=0 && colorMap.get(seq[i-2])===c) return false;
    if(i+1<seq.length && colorMap.get(seq[i+1])===c) return false;
    if(i+2<seq.length && colorMap.get(seq[i+2])===c) return false;
    return true;
  }

  // Repairs `seq` in place so no position within [0, lockedFrom) repeats a
  // color within 2 slots of itself — including against the fixed/"locked"
  // trailing items from lockedFrom onward (checked against, but themselves
  // never moved, since their positions are meaningful — e.g. the winner
  // symbol). Each candidate swap is verified directly against the real
  // resulting neighbors rather than reasoned about abstractly, so it's
  // correct by construction rather than by (fallible) inspection.
  function removeWindowRepeats(seq, colorMap, lockedFrom){
    const limit = lockedFrom != null ? lockedFrom : seq.length;
    const maxIterations = seq.length*8;
    let iterations = 0;
    for(let i=0;i<limit;i++){
      while(!positionOk(seq, colorMap, i) && iterations < maxIterations){
        iterations++;
        let fixed = false;
        for(let j=0;j<limit;j++){
          if(j===i) continue;
          [seq[i], seq[j]] = [seq[j], seq[i]];
          if(positionOk(seq, colorMap, i) && positionOk(seq, colorMap, j)){ fixed = true; break; }
          [seq[i], seq[j]] = [seq[j], seq[i]]; // undo
        }
        // if no swap fixes it, the pool is too color-homogeneous to avoid
        // this particular repeat (e.g. fewer than 3 distinct colors in
        // play) — leave it; it's the best achievable arrangement
        if(!fixed) break;
      }
    }
    return seq;
  }

  function pickFiller(pool, excludeColors, colorMap){
    const candidates = pool.filter(it=> !excludeColors.includes(colorMap.get(it)));
    const list = candidates.length ? candidates : pool;
    return list[Math.floor(Math.random()*list.length)];
  }

  function getSlotSymbolHeight(){
    const reel = el.slotWindow ? el.slotWindow.querySelector('.slot-reel') : null;
    const h = reel ? reel.getBoundingClientRect().height : 0;
    // Deliberately rounded to a whole pixel. The scrolling strip is
    // transformed (translateY), which browsers composite on their own
    // layer and can snap to the nearest device pixel independently of
    // ordinary (non-transformed) layout — which is exactly how the
    // payline is positioned. Feed both a fractional heightPx and the two
    // can get snapped a pixel apart from each other despite using the
    // "same" number; a whole-pixel value removes the ambiguity for both
    // rendering paths to resolve differently.
    return h > 0 ? Math.round(h / SLOT_VISIBLE_ROWS) : 96;
  }

  // Belt-and-suspenders fix for the same class of drift: rather than trust
  // that the payline's CSS percentage sizing and the symbols' JS-computed
  // pixel sizing land on the exact same fractional value (they didn't,
  // reliably, once the reel had actually scrolled through many rows —
  // browser rounding on repeated layout reads is not guaranteed stable
  // frame to frame), the payline is now positioned in JS from the exact
  // same heightPx number used for the symbols and the scroll math. There's
  // no longer a second, independent calculation that can drift from it.
  function positionPayline(heightPx){
    if(!el.slotPayline) return;
    el.slotPayline.style.top = heightPx + 'px';
    el.slotPayline.style.height = heightPx + 'px';
  }

  function buildSlotSymbolEl(item, heightPx){
    const div = document.createElement('div');
    div.className = 'slot-symbol';
    div.style.height = heightPx + 'px';
    const idx = state.items.indexOf(item);
    const color = colorFor(item, idx < 0 ? 0 : idx);
    const imgSrc = itemImages[item.id];
    div.style.background = color;
    if(imgSrc){
      const img = document.createElement('img');
      img.src = imgSrc; img.alt = '';
      div.appendChild(img);
    } else {
      div.style.color = readableTextColor(color);
      const span = document.createElement('span');
      span.className = 'slot-symbol-label';
      span.style.fontSize = state.settings.slotLabelFontSize + 'px';
      span.textContent = truncate(item.label || '—', state.settings.slotLabelCharLimit);
      div.appendChild(span);
    }
    return div;
  }

  function renderReelStrip(stripEl, items, heightPx){
    stripEl.innerHTML = '';
    stripEl.style.transform = 'translateY(0px)';
    const frag = document.createDocumentFragment();
    items.forEach(it=> frag.appendChild(buildSlotSymbolEl(it, heightPx)));
    stripEl.appendChild(frag);
  }

  function renderSlotIdle(){
    const pool = slotWeightedPool();
    const heightPx = getSlotSymbolHeight();
    positionPayline(heightPx);
    const colorMap = buildColorMap();
    el.slotStrips.forEach(stripEl=>{
      if(!stripEl) return;
      if(pool.length === 0){
        stripEl.innerHTML = '';
        stripEl.style.transform = 'translateY(0px)';
        const placeholder = document.createElement('div');
        placeholder.className = 'slot-symbol slot-symbol-empty';
        placeholder.style.height = heightPx + 'px';
        placeholder.textContent = 'Add items to load the reel';
        stripEl.appendChild(placeholder);
        return;
      }
      const loops = Math.max(1, Math.ceil(SLOT_VISIBLE_ROWS/pool.length));
      const seq = shuffledCopy(Array.from({length: loops}).flatMap(()=> pool));
      removeWindowRepeats(seq, colorMap);
      renderReelStrip(stripEl, seq.slice(0, SLOT_VISIBLE_ROWS), heightPx);
    });
  }

  function buildReelStrip(pool, winnerItem, colorMap){
    const winnerColor = colorMap.get(winnerItem);
    const mainSeq = shuffledCopy(Array.from({length: SLOT_LOOPS}).flatMap(()=> pool));
    // the filler is the row that ends up right below the winner at rest —
    // it needs to differ from the winner AND from whatever row lands above
    // the winner, or a 3-row-window repeat (top === bottom, straddling the
    // winner) slips right back in even though no two rows are directly
    // adjacent. mainSeq isn't repaired yet at this point, but its current
    // last element is still the best available guess for "the row above."
    const topColorGuess = mainSeq.length ? colorMap.get(mainSeq[mainSeq.length-1]) : null;
    const filler = pickFiller(pool, [winnerColor, topColorGuess].filter(c=> c != null), colorMap);
    const strip = [...mainSeq, winnerItem, filler];
    // repair mainSeq's positions (0..mainSeq.length-1) in place; the winner
    // and filler are checked against but never moved, since their final
    // positions are what the landing animation targets
    removeWindowRepeats(strip, colorMap, mainSeq.length);
    return strip;
  }

  function setSpinButtonsState(running){
    const label = running ? 'STOP' : 'SPIN';
    [el.spinBtn, el.slotSpinBtn].forEach(btn=>{
      if(!btn) return;
      btn.textContent = label;
      btn.classList.toggle('stopping', running);
    });
  }

  function updateSpinButtonsVisibility(){
    const empty = state.items.length === 0;
    if(el.spinBtn) el.spinBtn.classList.toggle('hidden', empty);
    if(el.slotSpinBtn) el.slotSpinBtn.classList.toggle('hidden', empty);
  }

  // Shared by both the wheel and the slot reel: eases most of the way to a
  // "decoy" stopping point (so it looks like the spin is about to settle on
  // the wrong item), holds there just long enough to register, then snaps
  // on to the real result — the "wait, no—" beat. fromVal/decoyVal/toVal
  // are plain numbers — degrees of rotation for the wheel, pixels of
  // translateY for the reel. `overshoot` adds a slight past-the-target
  // bounce-back for extra punch; the wheel's pointer just needs to end up
  // in the right slice so a brief overshoot still reads fine, but the slot
  // reel has a hard-edged payline window, so overshooting there visibly
  // shows two symbols at once mid-bounce — pass overshoot:false for that.
  function buildNearMissTimeline(fromVal, decoyVal, toVal, mainDuration, ease, overshoot){
    const holdMs = 260; // a touch longer now that it visibly wobbles rather than freezing
    const nudgeMs = Math.max(190, mainDuration*0.05);
    // a couple of small, decaying oscillations around the hover point —
    // reads as hanging undecided between two items rather than a rigid
    // freeze. Scaled off the hover gap itself so it's proportionate
    // whether that gap is a few pixels on the reel or tens of degrees on
    // the wheel, and never swings wide enough to visibly cross into a
    // third item.
    const wobbleAmp = Math.abs(toVal-decoyVal) * 0.3;
    const nudgeEaseBack = t=>{
      const tm1 = t-1, c1 = 1.9, c3 = c1+1;
      return 1 + c3*tm1*tm1*tm1 + c1*tm1*tm1;
    };
    const nudgeEaseSharp = t=> 1 - Math.pow(1-t, 4); // quick, no overshoot — lands exactly and stays put
    const nudgeEase = overshoot ? nudgeEaseBack : nudgeEaseSharp;
    const totalDuration = mainDuration + holdMs + nudgeMs;
    return {
      totalDuration,
      valueAt(elapsed){
        if(elapsed <= mainDuration){
          const t = Math.min(1, elapsed/mainDuration);
          return fromVal + (decoyVal-fromVal)*ease(t);
        }
        if(elapsed <= mainDuration+holdMs){
          const holdT = (elapsed-mainDuration)/holdMs;
          const decay = 1 - holdT; // settles down right as the nudge takes over
          return decoyVal + Math.sin(holdT*Math.PI*2.5)*wobbleAmp*decay;
        }
        const t2 = Math.min(1, (elapsed-mainDuration-holdMs)/nudgeMs);
        return decoyVal + (toVal-decoyVal)*nudgeEase(t2);
      }
    };
  }

  function doSlotSpin(){
    if(slotSpinning) return;
    stopActivePreview();
    const pool = slotWeightedPool();
    if(pool.length < 2){
      flashMessage('Add at least two items with weight > 0 to spin.', 'Notice');
      return;
    }
    slotSpinning = true;
    slotCancelRequested = false;
    clearTimeout(flashTimer);
    setSpinButtonsState(true);
    el.winnerBanner.classList.remove('show');
    stopWinSound();
    playSpinStart();

    const winnerIdx = pickWeightedIndex();
    const winnerItem = state.items[winnerIdx];
    const heightPx = getSlotSymbolHeight();
    positionPayline(heightPx);
    const colorMap = buildColorMap();
    const ease = easeFn(state.settings.easing);
    const baseDuration = state.settings.duration*1000;
    const stagger = 320; // ms of extra spin time per reel, in case a future style uses more than one

    const reels = el.slotStrips.map((stripEl, i)=>{
      const strip = buildReelStrip(pool, winnerItem, colorMap);
      renderReelStrip(stripEl, strip, heightPx);
      const winnerPos = strip.length - 2; // second-to-last: leaves one filler symbol visible below the payline
      const targetY = -(winnerPos - 1) * heightPx; // -1 row so the winner lands in the middle (payline) row
      const dur = baseDuration + i*stagger;
      let timeline = null;
      if(state.settings.nearMiss && strip.length > 2){
        // hover partway between two symbols instead of squarely on one —
        // and randomly on either side of the winner, so the final nudge
        // sometimes continues forward and sometimes reels back
        const direction = Math.random() < 0.5 ? 1 : -1;
        const wobbleFraction = 0.3 + Math.random()*0.4;
        const decoyY = targetY + direction*heightPx*wobbleFraction;
        timeline = buildNearMissTimeline(0, decoyY, targetY, dur, ease, false);
      }
      return { stripEl, targetY, dur, timeline, lastTickStep: 0 };
    });

    const overallTotalDuration = Math.max(...reels.map(r=> r.timeline ? r.timeline.totalDuration : r.dur));
    const startTime = performance.now();
    startWhir();

    function frame(now){
      if(slotCancelRequested){ abortSlotSpin(); return; }
      const elapsed = now-startTime;
      let allDone = true;
      reels.forEach(reel=>{
        const reelTotal = reel.timeline ? reel.timeline.totalDuration : reel.dur;
        if(elapsed < reelTotal) allDone = false;
        const y = reel.timeline ? reel.timeline.valueAt(Math.min(elapsed, reelTotal)) : reel.targetY*ease(Math.min(1, elapsed/reel.dur));
        reel.stripEl.style.transform = `translateY(${y}px)`;
        const step = Math.floor(Math.abs(y) / heightPx);
        if(step > reel.lastTickStep){
          playTick();
          reel.lastTickStep = step;
        }
      });
      const overallT = Math.min(1, elapsed/overallTotalDuration);
      updateWhir(Math.max(0, 1 - overallT));

      if(!allDone){
        slotRafId = requestAnimationFrame(frame);
      } else {
        reels.forEach(reel=> reel.stripEl.style.transform = `translateY(${reel.targetY}px)`);
        finishSlotSpin(winnerItem, winnerIdx);
      }
    }
    slotRafId = requestAnimationFrame(frame);
  }

  function cancelSlotSpin(){
    if(!slotSpinning) return;
    slotCancelRequested = true;
  }

  function abortSlotSpin(){
    if(slotRafId) cancelAnimationFrame(slotRafId);
    slotRafId = null;
    slotSpinning = false;
    slotCancelRequested = false;
    stopWhir();
    setSpinButtonsState(false);
    flashMessage('Spin cancelled', 'Cancelled');
  }

  function finishSlotSpin(winnerItem, winnerIdx){
    slotSpinning = false;
    slotRafId = null;
    setSpinButtonsState(false);
    finishSpin(winnerItem, winnerIdx); // shared winner banner, confetti, sound, and history logic
  }

  function handleSpinPress(){
    if(state.settings.wheelStyle === 'slot'){
      slotSpinning ? cancelSlotSpin() : doSlotSpin();
    } else {
      spinning ? cancelSpin() : doSpin();
    }
  }

  const WHEEL_STAGE_FOOT = 'Tap <b>SPIN</b> or press <b>Space</b> to go — tap again to cancel mid-spin. The wheel picks a weighted-random winner the instant you spin; the animation just shows you the result.';
  const SLOT_STAGE_FOOT = 'Tap <b>SPIN</b> or press <b>Space</b> to pull the reel — tap again to cancel mid-spin. The winner is picked the instant you spin; the reel just shows you the result.';

  function applyWheelStyle(){
    const isSlot = state.settings.wheelStyle === 'slot';
    if(el.wheelWrap) el.wheelWrap.classList.toggle('hidden', isSlot);
    if(el.slotWrap) el.slotWrap.classList.toggle('hidden', !isSlot);
    if(el.stageFoot) el.stageFoot.innerHTML = isSlot ? SLOT_STAGE_FOOT : WHEEL_STAGE_FOOT;
    el.stageModeBtns.forEach(btn=> btn.classList.toggle('active', btn.dataset.style === state.settings.wheelStyle));
    if(isSlot){
      stopIdleSpin();
      renderSlotIdle();
    } else {
      fitCanvas();
      if(state.settings.idleSpin) startIdleSpin();
    }
    updateSpinButtonsVisibility();
  }

  el.stageModeBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(state.settings.wheelStyle === btn.dataset.style) return;
      state.settings.wheelStyle = btn.dataset.style;
      persistState();
      applyWheelStyle();
    });
  });

  window.addEventListener('resize', ()=>{
    fitCanvas();
    if(state.settings.wheelStyle === 'slot' && !slotSpinning) renderSlotIdle();
  });

  /* ============================ ITEMS UI ============================ */
  let expandedSoundPanels = new Set(); // item ids whose winner-sound panel is currently open
  function renderItems(){
    el.itemsList.innerHTML = '';
    if(state.items.length === 0){
      const empty = document.createElement('div');
      empty.className = 'empty-note';
      empty.textContent = 'No items yet — add one, or paste a batch list.';
      el.itemsList.appendChild(empty);
    }
    state.items.forEach((item, idx)=>{
      const block = document.createElement('div');
      block.className = 'item-block';

      const row = document.createElement('div');
      row.className = 'item-row';

      const swatch = document.createElement('input');
      swatch.type = 'color';
      swatch.className = 'swatch';
      swatch.value = item.color || colorFor(item, idx);
      swatch.title = 'Custom color';
      swatch.addEventListener('input', ()=>{ item.color = swatch.value; drawWheel(); persistState(); });

      const imgWrap = document.createElement('div');
      imgWrap.className = 'item-img-wrap';
      const imgBtn = document.createElement('button');
      imgBtn.type = 'button';
      imgBtn.className = 'item-img-btn';
      const hasImage = !!(item.image && itemImages[item.id]);
      if(hasImage){
        imgBtn.style.backgroundImage = `url(${itemImages[item.id]})`;
        imgBtn.title = 'Change image';
      } else {
        imgBtn.textContent = '🖼';
        imgBtn.title = 'Add image (shows in the winner popup)';
      }
      const imgFileInput = document.createElement('input');
      imgFileInput.type = 'file'; imgFileInput.accept = 'image/*'; imgFileInput.className = 'hidden';
      imgFileInput.addEventListener('change', ()=>{
        const file = imgFileInput.files && imgFileInput.files[0];
        imgFileInput.value = '';
        if(!file) return;
        handleItemImageUpload(item, file);
      });
      imgBtn.addEventListener('click', ()=> imgFileInput.click());
      imgWrap.append(imgBtn, imgFileInput);
      if(hasImage){
        const imgRm = document.createElement('button');
        imgRm.type = 'button';
        imgRm.className = 'item-img-rm';
        imgRm.innerHTML = '✕';
        imgRm.title = 'Remove image';
        imgRm.addEventListener('click', (e)=>{
          e.stopPropagation();
          removeItemImage(item);
        });
        imgWrap.appendChild(imgRm);
      }

      // winner-sound override — a single small toggle button, same footprint as the
      // image button. It only shows a tint when a sound is actually set; the actual
      // upload/preview/remove controls live in a collapsible panel below the row
      // rather than as more row-level icons, to keep the list itself uncluttered.
      const soundBtn = document.createElement('button');
      soundBtn.type = 'button';
      soundBtn.className = 'item-sound-btn';
      const hasWinSound = !!(item.winSound && itemWinSoundBuffers[item.id]);
      if(hasWinSound) soundBtn.classList.add('active');
      soundBtn.textContent = '🔔';
      soundBtn.title = hasWinSound ? 'Winner sound set — click to edit' : 'Set a custom winner sound for this item';
      soundBtn.addEventListener('click', ()=>{
        if(expandedSoundPanels.has(item.id)) expandedSoundPanels.delete(item.id);
        else expandedSoundPanels.add(item.id);
        renderItems();
      });

      const label = document.createElement('input');
      label.type = 'text';
      label.className = 'item-label';
      label.value = item.label;
      label.placeholder = 'Item name';
      label.addEventListener('input', ()=>{ item.label = label.value; drawWheel(); persistState(); });

      const weight = document.createElement('input');
      weight.type = 'number';
      weight.className = 'item-weight';
      weight.min = '0'; weight.step = '0.5';
      weight.value = item.weight;
      weight.addEventListener('input', ()=>{
        item.weight = Math.max(0, Number(weight.value)||0);
        drawWheel(); persistState();
      });

      const del = document.createElement('button');
      del.className = 'item-del';
      del.innerHTML = '✕';
      del.title = 'Remove item';
      del.addEventListener('click', ()=>{
        state.items = state.items.filter(i=>i.id !== item.id);
        expandedSoundPanels.delete(item.id);
        renderItems(); drawWheel(); persistState();
      });

      row.append(swatch, imgWrap, soundBtn, label, weight, del);
      block.appendChild(row);

      if(expandedSoundPanels.has(item.id)){
        block.appendChild(buildItemSoundPanel(item));
      }

      el.itemsList.appendChild(block);
    });
  }

  function buildItemSoundPanel(item){
    const panel = document.createElement('div');
    panel.className = 'item-sound-panel';
    const hasWinSound = !!(item.winSound && itemWinSoundBuffers[item.id]);

    const label = document.createElement('div');
    label.className = 'item-sound-panel-label';
    label.textContent = hasWinSound
      ? `Plays instead of the normal win sound when "${item.label || 'this item'}" wins`
      : `Optional — overrides the normal win sound only when "${item.label || 'this item'}" wins`;
    panel.appendChild(label);

    const row = document.createElement('div');
    row.className = 'item-sound-panel-row';

    if(hasWinSound){
      const name = document.createElement('span');
      name.className = 'item-sound-panel-name';
      name.textContent = `${item.winSound.name} · ${formatBytes(item.winSound.size)}`;
      row.appendChild(name);

      const previewBtn = document.createElement('button');
      previewBtn.className = 'btn small ghost'; previewBtn.textContent = '▶ Preview';
      previewBtn.addEventListener('click', ()=>{
        stopActivePreview();
        const buf = itemWinSoundBuffers[item.id];
        const src = playBufferOneShot(buf, state.sound.volumes.win);
        const capMs = Math.min(PREVIEW_MAX_MS, buf.duration*1000);
        previewStop = ()=> src.stop();
        previewTimer = setTimeout(()=>{ try{ src.stop(); }catch(e){} previewStop = null; }, capMs);
      });
      row.appendChild(previewBtn);

      const rmBtn = document.createElement('button');
      rmBtn.className = 'btn small ghost'; rmBtn.textContent = 'Remove';
      rmBtn.addEventListener('click', ()=> removeItemWinSound(item));
      row.appendChild(rmBtn);
    } else {
      const fileInput = document.createElement('input');
      fileInput.type = 'file'; fileInput.accept = 'audio/*'; fileInput.className = 'hidden';
      fileInput.addEventListener('change', ()=>{
        const file = fileInput.files && fileInput.files[0];
        fileInput.value = '';
        if(file) handleItemWinSoundUpload(item, file);
      });
      const addBtn = document.createElement('button');
      addBtn.className = 'btn small'; addBtn.textContent = 'Upload sound';
      addBtn.addEventListener('click', ()=> fileInput.click());
      row.append(addBtn, fileInput);
    }
    panel.appendChild(row);
    return panel;
  }

  function handleItemImageUpload(item, file){
    if(!file.type.startsWith('image/')){ flashMessage('That file doesn\'t look like an image.', 'Notice'); return; }
    if(file.size > MAX_ITEM_IMAGE_BYTES){ flashMessage(`Keep images under ${formatBytes(MAX_ITEM_IMAGE_BYTES)}.`, 'Notice'); return; }
    const reader = new FileReader();
    reader.onload = async ()=>{
      const dataURL = reader.result;
      const saved = await persistItemImage(item.id, dataURL);
      if(saved){
        itemImages[item.id] = dataURL;
        item.image = { name: file.name, size: file.size };
        persistState();
        renderItems();
      }
    };
    reader.onerror = ()=> flashMessage('Could not read that file.', 'Notice');
    reader.readAsDataURL(file);
  }
  function removeItemImage(item){
    delete itemImages[item.id];
    item.image = null;
    deleteItemImageStorage(item.id);
    persistState();
    renderItems();
  }

  function handleItemWinSoundUpload(item, file){
    if(!file.type.startsWith('audio/')){ flashMessage("That file doesn't look like audio.", 'Notice'); return; }
    if(file.size > MAX_SOUND_BYTES){ flashMessage(`Keep sounds under ${formatBytes(MAX_SOUND_BYTES)}.`, 'Notice'); return; }
    const reader = new FileReader();
    reader.onload = async ()=>{
      const dataURL = reader.result;
      const saved = await persistItemWinSound(item.id, dataURL);
      if(saved){
        itemWinSounds[item.id] = dataURL;
        item.winSound = { name: file.name, size: file.size };
        await decodeItemWinSoundBuffer(item.id);
        persistState();
        renderItems();
      }
    };
    reader.onerror = ()=> flashMessage('Could not read that file.', 'Notice');
    reader.readAsDataURL(file);
  }
  function removeItemWinSound(item){
    delete itemWinSounds[item.id];
    delete itemWinSoundBuffers[item.id];
    item.winSound = null;
    deleteItemWinSoundStorage(item.id);
    persistState();
    renderItems();
  }

  el.addItemBtn.addEventListener('click', ()=>{
    state.items.push({ id: id(), label: 'New item', weight: 1, color: null, image: null, winSound: null });
    renderItems(); drawWheel(); persistState();
  });
  el.shuffleBtn.addEventListener('click', ()=>{
    if(state.items.length < 2){
      flashMessage('Add at least two items to shuffle.', 'Notice');
      return;
    }
    const before = state.items.map(i=>i.id).join(',');
    let attempts = 0;
    do{
      fisherYatesShuffle(state.items);
      attempts++;
    } while(state.items.map(i=>i.id).join(',') === before && attempts < 8);
    renderItems(); drawWheel(); persistState();
    flashMessage('Shuffled ' + state.items.length + ' items', 'Shuffled');
  });
  function fisherYatesShuffle(arr){
    for(let i = arr.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  el.clearItemsBtn.addEventListener('click', confirmable(el_ => {
    state.items = [];
    renderItems(); drawWheel(); persistState();
  }, 'Clear all', 'Really clear?'));

  el.wheelName.addEventListener('input', ()=>{ state.wheelName = el.wheelName.value || 'Untitled Wheel'; persistState(); });

  el.newWheelBtn.addEventListener('click', confirmable(()=>{
    state.wheelName = 'Untitled Wheel';
    state.items = [];
    el.wheelName.value = state.wheelName;
    renderItems(); drawWheel(); persistState();
  }, 'New wheel', 'Discard current wheel?'));

  // small helper: turns a button into a "click again to confirm" pattern
  function confirmable(fn, normalLabel, confirmLabel){
    return function(e){
      const btn = e.currentTarget;
      if(btn.dataset.confirming === '1'){
        btn.dataset.confirming = '0';
        btn.textContent = btn.dataset.origLabel || normalLabel;
        fn(e);
      } else {
        btn.dataset.origLabel = btn.textContent;
        btn.dataset.confirming = '1';
        btn.textContent = confirmLabel;
        setTimeout(()=>{
          if(btn.dataset.confirming === '1'){
            btn.dataset.confirming = '0';
            btn.textContent = btn.dataset.origLabel || normalLabel;
          }
        }, 2500);
      }
    };
  }

  /* ============================ BATCH ============================ */
  function parseBatch(text){
    return text.split('\n').map(l=>l.trim()).filter(Boolean).map(line=>{
      const parts = line.split(',');
      const label = parts[0].trim();
      let weight = 1;
      if(parts.length > 1){
        const w = parseFloat(parts[1]);
        if(!isNaN(w) && w >= 0) weight = w;
      }
      return { id: id(), label: label || 'Item', weight, color: null, image: null, winSound: null };
    }).filter(i=>i.label);
  }
  // Like parseBatch, but keeps weight as null when it's missing/unparseable instead of
  // silently defaulting to 1 — for updating existing items we'd rather skip a line than
  // guess and clobber someone's actual weight.
  function parseBatchForUpdate(text){
    return text.split('\n').map(l=>l.trim()).filter(Boolean).map(line=>{
      const parts = line.split(',');
      const label = parts[0].trim();
      let weight = null;
      if(parts.length > 1){
        const w = parseFloat(parts[1]);
        if(!isNaN(w) && w >= 0) weight = w;
      }
      return { label, weight };
    }).filter(l=>l.label);
  }
  function condenseNameList(arr, cap=12){
    const shown = arr.slice(0,cap).map(escapeHtml).join(', ');
    return arr.length > cap ? `${shown}, +${arr.length-cap} more` : shown;
  }
  function clearBatchSummary(){
    el.batchSummary.style.display = 'none';
    el.batchSummary.innerHTML = '';
  }
  function renderBatchSummary({updatedCount, notFound, noWeight}){
    if(updatedCount === 0 && notFound.length === 0 && noWeight.length === 0){
      clearBatchSummary();
      return;
    }
    const lines = [];
    lines.push(`<div class="batch-summary-line"><strong>${updatedCount}</strong> item${updatedCount===1?'':'s'} updated</div>`);
    if(notFound.length){
      lines.push(`<div class="batch-summary-line warn"><strong>${notFound.length}</strong> not found on the wheel: ${condenseNameList(notFound)}</div>`);
    }
    if(noWeight.length){
      lines.push(`<div class="batch-summary-line warn"><strong>${noWeight.length}</strong> skipped — no valid weight given: ${condenseNameList(noWeight)}</div>`);
    }
    el.batchSummary.innerHTML = lines.join('');
    el.batchSummary.style.display = 'block';
  }
  el.batchAppendBtn.addEventListener('click', ()=>{
    const parsed = parseBatch(el.batchInput.value);
    state.items = state.items.concat(parsed);
    el.batchInput.value = '';
    clearBatchSummary();
    renderItems(); drawWheel(); persistState();
    switchTab('items');
  });
  el.batchUpdateBtn.addEventListener('click', ()=>{
    const lines = parseBatchForUpdate(el.batchInput.value);
    if(lines.length === 0){
      flashMessage('Paste some items first.', 'Notice');
      return;
    }
    let updatedCount = 0;
    const notFound = [];
    const noWeight = [];
    lines.forEach(line=>{
      if(line.weight === null){
        noWeight.push(line.label);
        return;
      }
      const matches = state.items.filter(it=> it.label.trim().toLowerCase() === line.label.toLowerCase());
      if(matches.length === 0){
        notFound.push(line.label);
        return;
      }
      matches.forEach(it=>{ it.weight = line.weight; });
      updatedCount += matches.length;
    });
    renderBatchSummary({ updatedCount, notFound, noWeight });
    renderItems(); drawWheel(); persistState();
  });
  el.batchReplaceBtn.addEventListener('click', ()=>{
    const parsed = parseBatch(el.batchInput.value);
    state.items = parsed;
    el.batchInput.value = '';
    clearBatchSummary();
    renderItems(); drawWheel(); persistState();
    switchTab('items');
  });
  function switchTab(name){
    document.querySelector(`.tab-btn[data-tab="${name}"]`).click();
  }

  /* ============================ SETTINGS ============================ */
  function applyWheelTitleFont(){
    const f = TITLE_FONTS.find(x=>x.id===state.settings.wheelTitleFont) || TITLE_FONTS[0];
    el.wheelName.style.fontFamily = f.family;
    el.wheelName.style.fontWeight = f.weight;
    el.wheelName.style.fontStyle = f.style;
    el.wheelName.style.letterSpacing = f.letterSpacing;
    el.wheelName.style.fontSize = (state.settings.wheelTitleSize*f.sizeMult)+'px';
  }
  el.titleFontSelect.addEventListener('change', ()=>{
    state.settings.wheelTitleFont = el.titleFontSelect.value;
    applyWheelTitleFont();
    persistState();
  });
  el.wheelTitleSizeRange.addEventListener('input', ()=>{
    state.settings.wheelTitleSize = parseInt(el.wheelTitleSizeRange.value, 10);
    el.wheelTitleSizeVal.textContent = state.settings.wheelTitleSize+'px';
    applyWheelTitleFont();
    persistState();
  });
  function syncSettingsUI(){
    el.nearMiss.checked = state.settings.nearMiss;
    el.slotLabelLimitRange.value = state.settings.slotLabelCharLimit;
    el.slotLabelLimitVal.textContent = state.settings.slotLabelCharLimit+' chars';
    el.slotLabelSizeRange.value = state.settings.slotLabelFontSize;
    el.slotLabelSizeVal.textContent = state.settings.slotLabelFontSize+'px';
    el.titleFontSelect.value = state.settings.wheelTitleFont;
    el.wheelTitleSizeRange.value = state.settings.wheelTitleSize;
    el.wheelTitleSizeVal.textContent = state.settings.wheelTitleSize+'px';
    applyWheelTitleFont();
    el.durationRange.value = state.settings.duration;
    el.durationVal.textContent = state.settings.duration+'s';
    el.spinsRange.value = state.settings.spins;
    el.spinsVal.textContent = state.settings.spins;
    el.angleRange.value = state.settings.angle;
    el.angleVal.textContent = state.settings.angle+'°';
    el.easingSelect.value = state.settings.easing;
    el.randomizeAngle.checked = state.settings.randomizeAngle;
    el.angleRange.disabled = state.settings.randomizeAngle;
    el.idleSpin.checked = state.settings.idleSpin;
    el.labelLimitRange.value = state.settings.labelCharLimit;
    el.labelLimitVal.textContent = state.settings.labelCharLimit+' chars';
    el.labelRawSizeRange.value = state.settings.labelRawSize;
    el.labelRawSizeVal.textContent = state.settings.labelRawSize+'px';
    el.labelOverflow.checked = state.settings.labelOverflow;
    el.bannerImageLayout.value = state.settings.bannerImageLayout;
    el.bannerImageFit.value = state.settings.bannerImageFit;
    el.bannerImageOpacityRange.value = Math.round(state.settings.bannerImageOpacity*100);
    el.bannerImageOpacityVal.textContent = Math.round(state.settings.bannerImageOpacity*100)+'%';
  }
  el.nearMiss.addEventListener('change', ()=>{
    state.settings.nearMiss = el.nearMiss.checked;
    persistState();
  });
  el.slotLabelLimitRange.addEventListener('input', ()=>{
    state.settings.slotLabelCharLimit = parseInt(el.slotLabelLimitRange.value, 10);
    el.slotLabelLimitVal.textContent = state.settings.slotLabelCharLimit+' chars';
    if(state.settings.wheelStyle === 'slot' && !slotSpinning) renderSlotIdle();
    persistState();
  });
  el.slotLabelSizeRange.addEventListener('input', ()=>{
    state.settings.slotLabelFontSize = parseInt(el.slotLabelSizeRange.value, 10);
    el.slotLabelSizeVal.textContent = state.settings.slotLabelFontSize+'px';
    if(state.settings.wheelStyle === 'slot' && !slotSpinning) renderSlotIdle();
    persistState();
  });
  el.durationRange.addEventListener('input', ()=>{
    state.settings.duration = parseInt(el.durationRange.value, 10);
    el.durationVal.textContent = state.settings.duration+'s';
    persistState();
  });
  el.spinsRange.addEventListener('input', ()=>{
    state.settings.spins = parseInt(el.spinsRange.value, 10);
    el.spinsVal.textContent = state.settings.spins;
    persistState();
  });
  el.angleRange.addEventListener('input', ()=>{
    state.settings.angle = parseInt(el.angleRange.value, 10);
    el.angleVal.textContent = state.settings.angle+'°';
    drawWheel(); persistState();
  });
  el.randomizeAngle.addEventListener('change', ()=>{
    state.settings.randomizeAngle = el.randomizeAngle.checked;
    el.angleRange.disabled = state.settings.randomizeAngle;
    persistState();
  });
  el.idleSpin.addEventListener('change', ()=>{
    state.settings.idleSpin = el.idleSpin.checked;
    persistState();
    if(state.settings.idleSpin) startIdleSpin(); else stopIdleSpin();
  });
  el.easingSelect.addEventListener('change', ()=>{
    state.settings.easing = el.easingSelect.value; persistState();
  });
  el.labelLimitRange.addEventListener('input', ()=>{
    state.settings.labelCharLimit = parseInt(el.labelLimitRange.value, 10);
    el.labelLimitVal.textContent = state.settings.labelCharLimit+' chars';
    drawWheel(); persistState();
  });
  el.labelRawSizeRange.addEventListener('input', ()=>{
    state.settings.labelRawSize = parseInt(el.labelRawSizeRange.value, 10);
    el.labelRawSizeVal.textContent = state.settings.labelRawSize+'px';
    drawWheel(); persistState();
  });
  el.labelOverflow.addEventListener('change', ()=>{
    state.settings.labelOverflow = el.labelOverflow.checked;
    drawWheel(); persistState();
  });

  /* ---------- Winner banner image display prefs (the images themselves live on items) ---------- */
  el.bannerImageLayout.addEventListener('change', ()=>{
    state.settings.bannerImageLayout = el.bannerImageLayout.value;
    persistState();
  });
  el.bannerImageFit.addEventListener('change', ()=>{
    state.settings.bannerImageFit = el.bannerImageFit.value;
    persistState();
  });
  el.bannerImageOpacityRange.addEventListener('input', ()=>{
    state.settings.bannerImageOpacity = parseInt(el.bannerImageOpacityRange.value, 10)/100;
    el.bannerImageOpacityVal.textContent = el.bannerImageOpacityRange.value+'%';
    persistState();
  });
  // Called only when an actual winner is announced — notices never get an image.
  function applyBannerImage(winnerItem){
    el.bannerRibbon.classList.remove('layout-left','layout-right','layout-top','layout-bottom','layout-background');
    const dataURL = winnerItem && winnerItem.image ? itemImages[winnerItem.id] : null;
    if(!dataURL) return;
    el.bannerRibbon.classList.add('layout-'+state.settings.bannerImageLayout);
    el.bannerSideImage.src = dataURL;
    el.bannerBgImage.src = dataURL;
    el.bannerSideImage.style.opacity = state.settings.bannerImageOpacity;
    el.bannerBgImage.style.opacity = state.settings.bannerImageOpacity;
    el.bannerSideImage.style.objectFit = state.settings.bannerImageFit;
    el.bannerBgImage.style.objectFit = state.settings.bannerImageFit;
  }
  function clearBannerImage(){
    el.bannerRibbon.classList.remove('layout-left','layout-right','layout-top','layout-bottom','layout-background');
  }

  function renderPaletteGroupSelect(){
    el.paletteGroupSelect.innerHTML = '';
    Object.keys(PALETTE_GROUPS).forEach(g=>{
      const opt = document.createElement('option');
      opt.value = g; opt.textContent = g;
      el.paletteGroupSelect.appendChild(opt);
    });
    const myOpt = document.createElement('option');
    myOpt.value = 'My Palettes'; myOpt.textContent = 'My Palettes';
    el.paletteGroupSelect.appendChild(myOpt);
    el.paletteGroupSelect.value = uiPaletteGroup;
  }
  el.paletteGroupSelect.addEventListener('change', ()=>{
    uiPaletteGroup = el.paletteGroupSelect.value;
    renderPaletteGrid();
  });

  function applyPalette(name, opts){
    opts = opts || {};
    if(!opts.force && state.paletteName === name) return;
    state.paletteName = name;
    state.items.forEach(i=> i.color = null); // adopt the new palette's colors
    renderPaletteGrid(); renderItems(); drawWheel(); persistState();
    flashMessage(opts.message || ('Switched to ' + name), 'Palette');
  }

  const PALETTE_SOURCE_NOTES = {
    'Trending 2026': 'The 10 color families named in Gelato\u2019s 2026 design trend forecast, each turned into a ready-to-use palette.',
    'Timeless': 'Verified swatches from each palette\u2019s original documented spec — Flat UI Colors, Material Design, Solarized, Monokai, the web-safe 216, Crayola\u2019s original 1903 box, Bauhaus & Memphis Milano design history, Apple\u2019s iOS system colors, and Pantone\u2019s Color of the Year picks, 2000\u20132025.'
  };

  function renderPaletteGrid(){
    el.paletteGrid.innerHTML = '';
    if(PALETTE_SOURCE_NOTES[uiPaletteGroup]){
      el.paletteSourceNote.textContent = PALETTE_SOURCE_NOTES[uiPaletteGroup];
      el.paletteSourceNote.classList.remove('hidden');
    } else {
      el.paletteSourceNote.classList.add('hidden');
    }
    if(uiPaletteGroup === 'My Palettes'){
      renderCustomPaletteRows();
      return;
    }
    const entries = PALETTE_GROUPS[uiPaletteGroup] || {};
    Object.keys(entries).forEach(name=>{
      const btn = document.createElement('button');
      btn.className = 'palette-swatch' + (state.paletteName === name ? ' active' : '');
      btn.title = name;
      entries[name].slice(0,4).forEach(c=>{
        const s = document.createElement('span');
        s.style.background = c;
        btn.appendChild(s);
      });
      btn.addEventListener('click', ()=> applyPalette(name));
      el.paletteGrid.appendChild(btn);
    });
  }

  function renderCustomPaletteRows(){
    const names = Object.keys(customPalettes);
    if(names.length === 0){
      const empty = document.createElement('div');
      empty.className = 'empty-note';
      empty.textContent = 'No custom palettes yet — build one below and save it.';
      el.paletteGrid.appendChild(empty);
      return;
    }
    names.forEach(name=>{
      const row = document.createElement('div');
      row.className = 'saved-item';

      const meta = document.createElement('div');
      meta.className = 'meta';
      const dots = document.createElement('div');
      dots.className = 'palette-dots';
      customPalettes[name].forEach(c=>{
        const d = document.createElement('span');
        d.style.background = c;
        dots.appendChild(d);
      });
      const nameEl = document.createElement('div');
      nameEl.className = 'name';
      nameEl.style.marginTop = '5px';
      nameEl.textContent = name + (state.paletteName === name ? ' (active)' : '');
      meta.append(dots, nameEl);

      const useBtn = document.createElement('button');
      useBtn.className = 'btn small primary'; useBtn.textContent = 'Use';
      useBtn.addEventListener('click', ()=> applyPalette(name));

      const editBtn = document.createElement('button');
      editBtn.className = 'btn small ghost'; editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', ()=> loadPaletteIntoBuilder(name));

      const delBtn = document.createElement('button');
      delBtn.className = 'btn small danger'; delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', confirmable(()=>{
        delete customPalettes[name];
        persistCustomPalettes();
        if(state.paletteName === name){
          applyPalette('Carnival', { force:true, message: 'Deleted "'+name+'"' });
        } else {
          renderPaletteGrid();
        }
      }, 'Delete', 'Sure?'));

      row.append(meta, useBtn, editBtn, delBtn);
      el.paletteGrid.appendChild(row);
    });
  }

  function renderPaletteBuilder(){
    el.customPaletteColors.innerHTML = '';
    paletteDraft.forEach((color, idx)=>{
      const wrap = document.createElement('div');
      wrap.className = 'palette-color-item';

      const input = document.createElement('input');
      input.type = 'color';
      input.value = color;
      input.addEventListener('input', ()=>{ paletteDraft[idx] = input.value; });

      const rm = document.createElement('button');
      rm.className = 'rm';
      rm.innerHTML = '✕';
      rm.disabled = paletteDraft.length <= 2;
      rm.title = 'Remove color';
      rm.addEventListener('click', ()=>{
        paletteDraft.splice(idx, 1);
        renderPaletteBuilder();
      });

      wrap.append(input, rm);
      el.customPaletteColors.appendChild(wrap);
    });
  }

  function loadPaletteIntoBuilder(name){
    const source = customPalettes[name] || allBuiltInPalettes()[name];
    if(!source) return;
    paletteDraft = source.slice();
    el.customPaletteName.value = name;
    renderPaletteBuilder();
    el.customPaletteName.focus();
  }

  el.addPaletteColorBtn.addEventListener('click', ()=>{
    if(paletteDraft.length >= 10){
      flashMessage('Up to 10 colors per palette.', 'Notice');
      return;
    }
    const source = paletteColors();
    paletteDraft.push(source[paletteDraft.length % source.length] || '#cccccc');
    renderPaletteBuilder();
  });

  el.savePaletteBtn.addEventListener('click', ()=>{
    const name = el.customPaletteName.value.trim();
    if(!name){ flashMessage('Give your palette a name first.', 'Notice'); return; }
    if(paletteDraft.length < 2){ flashMessage('Add at least two colors.', 'Notice'); return; }
    customPalettes[name] = paletteDraft.slice();
    persistCustomPalettes();
    uiPaletteGroup = 'My Palettes';
    el.paletteGroupSelect.value = 'My Palettes';
    applyPalette(name, { force:true, message: 'Saved "'+name+'"' });
  });

  /* ============================ SOUNDS ============================ */
  el.recencyWeightToggle.addEventListener('change', ()=>{
    state.sound.recencyWeighted = el.recencyWeightToggle.checked;
    persistState();
  });
  el.normalizeCustomToggle.addEventListener('change', ()=>{
    state.sound.normalizeCustom = el.normalizeCustomToggle.checked;
    persistState();
    el.normalizeTargetBody.classList.toggle('disabled', !el.normalizeCustomToggle.checked);
  });
  el.normalizeTargetRange.addEventListener('input', ()=>{
    state.sound.normalizeTargetPeak = parseInt(el.normalizeTargetRange.value,10)/100;
    el.normalizeTargetVal.textContent = el.normalizeTargetRange.value+'%';
    persistState();
  });
  function syncSoundUI(){
    el.recencyWeightToggle.checked = state.sound.recencyWeighted;
    el.normalizeCustomToggle.checked = state.sound.normalizeCustom;
    el.normalizeTargetBody.classList.toggle('disabled', !state.sound.normalizeCustom);
    el.normalizeTargetRange.value = Math.round(state.sound.normalizeTargetPeak*100);
    el.normalizeTargetVal.textContent = Math.round(state.sound.normalizeTargetPeak*100)+'%';
    renderSoundControls();
  }

  function formatBytes(n){
    if(n < 1024) return n+' B';
    if(n < 1024*1024) return (n/1024).toFixed(0)+' KB';
    return (n/(1024*1024)).toFixed(1)+' MB';
  }

  function renderSoundControls(){
    el.soundRows.innerHTML = '';
    SOUND_DEFS.forEach(def=>{
      const key = def.key;
      const clips = customSounds[key] || [];
      const source = state.sound.source[key];

      const card = document.createElement('div');
      card.className = 'sound-card';

      // top row: label + enable switch
      const top = document.createElement('div');
      top.className = 'sound-card-top';
      const lbl = document.createElement('div');
      lbl.className = 'lbl';
      lbl.innerHTML = `${def.title}<small>${def.desc}</small>`;
      const switchLabel = document.createElement('label');
      switchLabel.className = 'switch';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.checked = state.sound[key];
      cb.addEventListener('change', ()=>{ state.sound[key] = cb.checked; persistState(); body.classList.toggle('disabled', !cb.checked); });
      const track = document.createElement('span'); track.className = 'track';
      switchLabel.append(cb, track);
      top.append(lbl, switchLabel);

      // body: source segmented control, then either a variant picker or a clip manager
      const body = document.createElement('div');
      body.className = 'sound-card-body' + (state.sound[key] ? '' : ' disabled');

      // per-sound volume — each of the three sounds gets its own independent level,
      // so e.g. the tick can be brought down relative to background music.
      const volField = document.createElement('div');
      volField.className = 'field';
      const volPct = Math.round(state.sound.volumes[key]*100);
      const volLabel = document.createElement('label');
      volLabel.innerHTML = `Volume <span class="val">${volPct}%</span>`;
      const volRange = document.createElement('input');
      volRange.type = 'range'; volRange.min = 0; volRange.max = 100; volRange.step = 1;
      volRange.value = volPct;
      volRange.addEventListener('input', ()=>{
        state.sound.volumes[key] = parseInt(volRange.value,10)/100;
        volLabel.querySelector('.val').textContent = volRange.value+'%';
        persistState();
      });
      volField.append(volLabel, volRange);
      body.appendChild(volField);

      // "keep playing behind the winner" only makes sense for the spin whir/music —
      // ticks and the win fanfare are one-shots, and this one setting decides
      // whether the whir fades out completely at the winner moment or lingers
      // quietly in the background until the winner banner is dismissed.
      if(key === 'music'){
        const duckTop = document.createElement('div');
        duckTop.className = 'sound-card-top';
        duckTop.style.marginTop = '4px';
        const duckLbl = document.createElement('div');
        duckLbl.className = 'lbl';
        duckLbl.innerHTML = 'Keep playing behind winner<small>Fades to a lower volume instead of stopping, until you dismiss the winner popup</small>';
        const duckSwitchLabel = document.createElement('label');
        duckSwitchLabel.className = 'switch';
        const duckCb = document.createElement('input');
        duckCb.type = 'checkbox'; duckCb.checked = state.sound.duckOnWin;
        duckCb.addEventListener('change', ()=>{
          state.sound.duckOnWin = duckCb.checked;
          persistState();
          duckLevelField.classList.toggle('disabled', !duckCb.checked);
        });
        const duckTrack = document.createElement('span'); duckTrack.className = 'track';
        duckSwitchLabel.append(duckCb, duckTrack);
        duckTop.append(duckLbl, duckSwitchLabel);
        body.appendChild(duckTop);

        const duckLevelField = document.createElement('div');
        duckLevelField.className = 'field' + (state.sound.duckOnWin ? '' : ' disabled');
        const duckPct = Math.round(state.sound.duckLevel*100);
        const duckLevelLabel = document.createElement('label');
        duckLevelLabel.innerHTML = `Winner background volume <span class="val">${duckPct}%</span>`;
        const duckLevelRange = document.createElement('input');
        duckLevelRange.type = 'range'; duckLevelRange.min = 5; duckLevelRange.max = 80; duckLevelRange.step = 1;
        duckLevelRange.value = duckPct;
        duckLevelRange.addEventListener('input', ()=>{
          state.sound.duckLevel = parseInt(duckLevelRange.value,10)/100;
          duckLevelLabel.querySelector('.val').textContent = duckLevelRange.value+'%';
          persistState();
          if(whirDucked) duckWhir(); // live-adjust if a winner is currently showing
        });
        duckLevelField.append(duckLevelLabel, duckLevelRange);
        body.appendChild(duckLevelField);
      }

      const seg = document.createElement('div');
      seg.className = 'seg';
      const genBtn = document.createElement('button');
      genBtn.textContent = 'Generated';
      genBtn.className = source === 'generated' ? 'active' : '';
      genBtn.addEventListener('click', ()=>{ state.sound.source[key] = 'generated'; persistState(); renderSoundControls(); });
      const customBtn = document.createElement('button');
      customBtn.textContent = 'Custom';
      customBtn.className = source === 'custom' ? 'active' : '';
      customBtn.addEventListener('click', ()=>{ state.sound.source[key] = 'custom'; persistState(); renderSoundControls(); });
      seg.append(genBtn, customBtn);
      body.appendChild(seg);

      if(source === 'generated'){
        const select = document.createElement('select');
        select.className = 'field-select';
        VARIANT_SETS[key].forEach(v=>{
          const opt = document.createElement('option');
          opt.value = v.id; opt.textContent = v.name;
          if(state.sound.variant[key] === v.id) opt.selected = true;
          select.appendChild(opt);
        });
        select.addEventListener('change', ()=>{ state.sound.variant[key] = select.value; persistState(); });
        body.appendChild(select);

        const actions = document.createElement('div');
        actions.className = 'sound-actions'; actions.style.marginTop = '9px';
        const previewBtn = document.createElement('button');
        previewBtn.className = 'btn small ghost'; previewBtn.textContent = '▶ Preview';
        previewBtn.addEventListener('click', ()=> previewSound(key));
        actions.appendChild(previewBtn);
        body.appendChild(actions);

        const status = document.createElement('div');
        status.className = 'sound-status';
        status.textContent = clips.length
          ? `${clips.length} custom clip${clips.length===1?'':'s'} uploaded — switch to Custom to use ${clips.length===1?'it':'them'}`
          : 'No custom clips uploaded yet';
        body.appendChild(status);
      } else {
        if(clips.length){
          const list = document.createElement('div');
          list.className = 'clip-list';
          clips.forEach((clip, idx)=>{
            const row = document.createElement('div');
            row.className = 'clip-row';
            const name = document.createElement('span');
            name.className = 'clip-name';
            name.textContent = `${clip.name} · ${formatBytes(clip.size)}`;
            const rm = document.createElement('button');
            rm.className = 'rm'; rm.innerHTML = '✕'; rm.title = 'Remove clip';
            rm.addEventListener('click', ()=> removeCustomClip(key, idx));
            row.append(name, rm);
            list.appendChild(row);
          });
          body.appendChild(list);
        } else {
          const empty = document.createElement('div');
          empty.className = 'empty-note';
          empty.style.padding = '10px'; empty.style.fontSize = '11.5px';
          empty.textContent = 'No clips yet — add one or more below.';
          body.appendChild(empty);
        }

        const fileInput = document.createElement('input');
        fileInput.type = 'file'; fileInput.accept = 'audio/*'; fileInput.multiple = true; fileInput.className = 'hidden';
        fileInput.addEventListener('change', ()=>{
          if(fileInput.files && fileInput.files.length) handleSoundUpload(key, Array.from(fileInput.files));
          fileInput.value = '';
        });

        const actions = document.createElement('div');
        actions.className = 'sound-actions';
        const addBtn = document.createElement('button');
        addBtn.className = 'btn small';
        addBtn.textContent = clips.length ? '+ Add more clips' : 'Upload clips';
        addBtn.addEventListener('click', ()=> fileInput.click());
        const previewBtn = document.createElement('button');
        previewBtn.className = 'btn small ghost';
        previewBtn.textContent = '▶ Preview random';
        previewBtn.disabled = clips.length === 0;
        previewBtn.addEventListener('click', ()=> previewSound(key));
        actions.append(addBtn, previewBtn, fileInput);
        body.appendChild(actions);

        const status = document.createElement('div');
        status.className = 'sound-status';
        status.textContent = clips.length
          ? `${clips.length} clip${clips.length===1?'':'s'} — a random one plays on each spin`
          : 'No clips uploaded — using the generated tone meanwhile';
        body.appendChild(status);
      }

      card.append(top, body);
      el.soundRows.appendChild(card);
    });
  }

  function handleSoundUpload(key, files){
    if(!customSounds[key]) customSounds[key] = [];
    const roomCount = MAX_CLIPS_PER_SOUND - customSounds[key].length;
    if(roomCount <= 0){
      flashMessage(`Up to ${MAX_CLIPS_PER_SOUND} clips per sound — remove one first.`, 'Notice');
      return;
    }
    const accepted = [];
    let skipped = 0;
    for(const file of files){
      if(accepted.length >= roomCount){ skipped++; continue; }
      if(!file.type.startsWith('audio/')){ skipped++; continue; }
      if(file.size > MAX_SOUND_BYTES){ skipped++; continue; }
      accepted.push(file);
    }
    if(accepted.length === 0){
      flashMessage(`Couldn't add those — keep clips under ${formatBytes(MAX_SOUND_BYTES)} and audio-only.`, 'Notice');
      return;
    }
    if(skipped){
      flashMessage(`Added ${accepted.length}, skipped ${skipped} (too big, wrong type, or over the ${MAX_CLIPS_PER_SOUND}-clip limit).`, 'Notice');
    }
    let pending = accepted.length;
    accepted.forEach(file=>{
      const reader = new FileReader();
      reader.onload = async ()=>{
        const clip = { id: id(), dataURL: reader.result, name: file.name, size: file.size };
        const saved = await persistClip(clip);
        if(saved){
          customSounds[key].push(clip);
          if(!customBuffers[key]) customBuffers[key] = [];
          customBuffers[key].push(await decodeClipBuffer(clip));
        }
        pending--;
        if(pending === 0) finishBatch();
      };
      reader.onerror = ()=>{ pending--; if(pending === 0) finishBatch(); };
      reader.readAsDataURL(file);
    });
    function finishBatch(){
      state.sound.source[key] = 'custom';
      persistClipIndex();
      persistState();
      renderSoundControls();
    }
  }

  function removeCustomClip(key, idx){
    const [removed] = customSounds[key].splice(idx, 1);
    if(customBuffers[key]) customBuffers[key].splice(idx, 1);
    if(removed){
      // a clip id can end up referenced by more than one saved wheel (e.g. saving a
      // wheel, then saving it again under a new name) — only actually delete the
      // audio bytes if nothing else still points at them, so removing a clip from
      // this wheel can't silently break another wheel that shares it.
      const stillReferenced = Object.values(savedWheels).some(w=>{
        const refs = w.customSounds || {};
        return SOUND_DEFS.some(d=> (refs[d.key]||[]).some(c=> c.id === removed.id));
      });
      if(!stillReferenced) deleteClipStorage(removed.id);
      if(clipLastPicked[key]) delete clipLastPicked[key][removed.id];
    }
    if(customSounds[key].length === 0 && state.sound.source[key] === 'custom'){
      state.sound.source[key] = 'generated';
    }
    persistClipIndex(); persistState(); renderSoundControls();
  }

  function dataURLToArrayBuffer(dataURL){
    const base64 = dataURL.slice(dataURL.indexOf(',')+1);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  // Custom clips vary wildly in recording loudness — rather than asking people to
  // pre-compress them in an external editor, measure each clip's peak level once
  // on decode and cache it (AudioBuffer -> peak, 0..1). The compensating gain is
  // derived from that cached peak + the user's target-peak slider at playback
  // time, so dragging the slider re-balances instantly without re-decoding.
  // Peak-based (not full loudness/LUFS) is deliberate: it's cheap, has no
  // external dependency, and is enough to stop one clip from jumping out over
  // the others.
  const clipPeakLevel = new WeakMap();
  function measurePeak(buffer){
    let peak = 0;
    for(let ch = 0; ch < buffer.numberOfChannels; ch++){
      const data = buffer.getChannelData(ch);
      // sampling rather than scanning every frame keeps this cheap even for longer clips
      const step = Math.max(1, Math.floor(data.length / 20000));
      for(let i = 0; i < data.length; i += step){
        const v = Math.abs(data[i]);
        if(v > peak) peak = v;
      }
    }
    return peak;
  }
  function normGainFor(buffer){
    if(!buffer || !state.sound.normalizeCustom) return 1;
    const peak = clipPeakLevel.get(buffer);
    if(peak === undefined || peak < 0.001) return 1; // unmeasured, or near-silent/empty — don't blow up noise
    return Math.min(3, Math.max(0.2, state.sound.normalizeTargetPeak / peak));
  }
  async function decodeDataURLToBuffer(dataURL){
    const ac = getCtx();
    const arr = dataURLToArrayBuffer(dataURL);
    const buf = await ac.decodeAudioData(arr);
    clipPeakLevel.set(buf, measurePeak(buf));
    return buf;
  }
  async function decodeClipBuffer(clip){
    try{
      return await decodeDataURLToBuffer(clip.dataURL);
    }catch(e){
      console.error('could not decode clip', e);
      return null;
    }
  }
  async function decodeItemWinSoundBuffer(itemId){
    const dataURL = itemWinSounds[itemId];
    if(!dataURL){ delete itemWinSoundBuffers[itemId]; return; }
    try{
      itemWinSoundBuffers[itemId] = await decodeDataURLToBuffer(dataURL);
    }catch(e){
      console.error('could not decode item win sound', e);
      itemWinSoundBuffers[itemId] = null;
    }
  }
  async function decodeAllCustomSounds(){
    for(const def of SOUND_DEFS){
      const clips = customSounds[def.key] || [];
      customBuffers[def.key] = [];
      for(const clip of clips){
        customBuffers[def.key].push(await decodeClipBuffer(clip));
      }
    }
  }
  async function decodeAllItemWinSounds(){
    for(const itemId of Object.keys(itemWinSounds)){
      await decodeItemWinSoundBuffer(itemId);
    }
  }
  // Per-key logical clock + last-picked tick per clip id, used to softly penalize
  // recently-played clips rather than repeating a small pool back-to-back.
  // In-memory only — resets on reload, which is fine since it's just about feel
  // within a session, not a persisted requirement.
  let clipPickCounter = { music: 0, tick: 0, win: 0, spinStart: 0 };
  let clipLastPicked = { music: {}, tick: {}, win: {}, spinStart: {} };
  function pickRandomBuffer(key){
    const clips = customSounds[key] || [];
    const bufs = customBuffers[key] || [];
    const pool = clips.map((clip, i)=> ({ clip, buf: bufs[i] })).filter(p=> p.buf);
    if(pool.length === 0) return null;
    if(pool.length === 1 || !state.sound.recencyWeighted){
      const pick = pool[Math.floor(Math.random()*pool.length)];
      clipPickCounter[key] = (clipPickCounter[key]||0) + 1;
      clipLastPicked[key][pick.clip.id] = clipPickCounter[key];
      return pick.buf;
    }
    // weight = 1 + how many picks it's been since this clip last played, capped at
    // pool.length so a clip that's been silent a long time doesn't dominate forever.
    // Clips never played yet get the max weight, so everything gets a turn early on.
    const tick = clipPickCounter[key] || 0;
    const weights = pool.map(p=>{
      const last = clipLastPicked[key][p.clip.id];
      const age = (last === undefined) ? pool.length : Math.min(tick - last, pool.length);
      return 1 + age;
    });
    const total = weights.reduce((a,b)=>a+b, 0);
    let r = Math.random()*total;
    let chosen = pool[pool.length-1];
    for(let i=0;i<pool.length;i++){
      r -= weights[i];
      if(r <= 0){ chosen = pool[i]; break; }
    }
    clipPickCounter[key] = tick+1;
    clipLastPicked[key][chosen.clip.id] = clipPickCounter[key];
    return chosen.buf;
  }

  const PREVIEW_MAX_MS = 5000;
  let previewTimer = null;
  let previewStop = null;

  function stopActivePreview(){
    clearTimeout(previewTimer);
    previewTimer = null;
    if(previewStop){
      try{ previewStop(); }catch(e){}
      previewStop = null;
    }
  }

  function previewSound(key){
    stopActivePreview();

    if(key === 'music'){
      startWhir(true);
      setTimeout(()=> updateWhir(0.9), 50);
      previewStop = stopWhir;
      previewTimer = setTimeout(()=>{ stopWhir(); previewStop = null; }, PREVIEW_MAX_MS);
      return;
    }

    const oneShotPlayers = { tick: playTick, win: playWin, spinStart: playSpinStart };
    const src = oneShotPlayers[key](true);
    if(src){ // a custom clip is playing — make sure it can't run past the cap
      const capMs = Math.min(PREVIEW_MAX_MS, src.buffer.duration*1000);
      previewStop = ()=> src.stop();
      previewTimer = setTimeout(()=>{ try{ src.stop(); }catch(e){} previewStop = null; }, capMs);
    }
    // generated tick/win sounds are already well under 5s, nothing further to cap
  }

  let actx = null;
  function getCtx(){
    if(!actx){ actx = new (window.AudioContext || window.webkitAudioContext)(); }
    return actx;
  }
  function audioCtx(){
    const ac = getCtx();
    if(ac.state === 'suspended') ac.resume();
    return ac;
  }

  let whirNodes = null;
  let whirDucked = false; // true while the whir/music is intentionally lingering at low volume behind the winner banner
  let winSoundNode = null; // the currently-playing win sound, if it's a custom clip (generated variants self-terminate quickly and don't need tracking)
  function stopWinSound(){
    if(!winSoundNode) return;
    try{ winSoundNode.stop(); }catch(e){ /* already stopped/ended — fine */ }
    winSoundNode = null;
  }
  function startWhir(force){
    if(!force && !state.sound.music) return;
    if(whirNodes) stopWhir(); // e.g. a previous winner's ducked whir shouldn't linger into a new spin
    whirDucked = false;
    const ac = audioCtx();
    const gain = ac.createGain();
    gain.gain.value = 0;
    gain.connect(ac.destination);

    const customBuf = state.sound.source.music === 'custom' ? pickRandomBuffer('music') : null;
    const musicVol = state.sound.volumes.music;
    const normGain = customBuf ? normGainFor(customBuf) : 1;

    if(customBuf){
      const src = ac.createBufferSource();
      src.buffer = customBuf;
      src.loop = true;
      src.connect(gain);
      src.start();
      gain.gain.linearRampToValueAtTime(musicVol * normGain, ac.currentTime + 0.3);
      whirNodes = { type: 'custom', src, gain, normGain };
    } else {
      const variant = getVariant('music');
      const built = variant.build(ac);
      built.output.connect(gain);
      built.sources.forEach(s=> s.start());
      gain.gain.linearRampToValueAtTime(musicVol, ac.currentTime + 0.3);
      whirNodes = { type: 'generated', built, gain, normGain: 1 };
    }
  }
  function updateWhir(speedFactor){ // speedFactor 0..1
    if(!whirNodes) return;
    // Only the synthesized "engine" variants react to spin speed (that's the point of
    // them). A custom uploaded clip is the user's own audio/music — it should just loop
    // at its natural speed and pitch throughout the spin, not get dragged/warped.
    if(whirNodes.type === 'generated'){
      whirNodes.built.update(speedFactor);
    }
  }
  function stopWhir(){
    if(!whirNodes) return;
    const ac = audioCtx();
    whirNodes.gain.gain.cancelScheduledValues(ac.currentTime);
    whirNodes.gain.gain.setValueAtTime(whirNodes.gain.gain.value, ac.currentTime);
    whirNodes.gain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.35);
    const nodes = whirNodes;
    setTimeout(()=>{
      try{
        if(nodes.type === 'custom') nodes.src.stop();
        else nodes.built.sources.forEach(s=>{ try{ s.stop(); }catch(e){} });
      }catch(e){}
    }, 500);
    whirNodes = null;
    whirDucked = false;
  }
  // Instead of stopping the whir/music at the winner moment, fade it down to a low
  // background level and leave it playing — used when "keep music playing behind
  // the winner" is enabled. stopWhir() (called from hideBanner) cleans it up for real.
  function duckWhir(){
    if(!whirNodes) return;
    const ac = audioCtx();
    const target = state.sound.volumes.music * state.sound.duckLevel * (whirNodes.normGain || 1);
    whirNodes.gain.gain.cancelScheduledValues(ac.currentTime);
    whirNodes.gain.gain.setValueAtTime(whirNodes.gain.gain.value, ac.currentTime);
    whirNodes.gain.gain.linearRampToValueAtTime(target, ac.currentTime + 0.5);
    whirDucked = true;
  }
  function playTick(force){
    if(!force && !state.sound.tick) return null;
    const ac = audioCtx();
    const customBuf = state.sound.source.tick === 'custom' ? pickRandomBuffer('tick') : null;
    const tickVol = state.sound.volumes.tick;
    if(customBuf){
      const src = ac.createBufferSource();
      src.buffer = customBuf;
      const gain = ac.createGain();
      gain.gain.value = tickVol * normGainFor(customBuf);
      src.connect(gain); gain.connect(ac.destination);
      src.start();
      return src;
    }
    getVariant('tick').play(ac, tickVol);
    return null;
  }
  // Plays a decoded AudioBuffer once through a fresh gain node (peak-normalized same
  // as any other custom clip) and tracks it as the current win sound so it can be
  // stopped early if the winner banner closes before the clip finishes.
  function playBufferOneShot(buf, vol){
    const ac = audioCtx();
    const src = ac.createBufferSource();
    src.buffer = buf;
    const gain = ac.createGain();
    gain.gain.value = vol * normGainFor(buf);
    src.connect(gain); gain.connect(ac.destination);
    src.onended = ()=>{ if(winSoundNode === src) winSoundNode = null; };
    src.start();
    return src;
  }
  function playWin(force){
    if(!force && !state.sound.win) return null;
    const ac = audioCtx();
    const customBuf = state.sound.source.win === 'custom' ? pickRandomBuffer('win') : null;
    const winVol = state.sound.volumes.win;
    if(customBuf) return playBufferOneShot(customBuf, winVol);
    getVariant('win').play(ac, winVol);
    return null;
  }
  // A specific item can override what plays when it wins (set from the Items list).
  // Falls back to the normal win sound (generated or category-custom) otherwise, and
  // is still gated by the master win-sound toggle either way.
  function playWinForItem(winnerItem, force){
    if(!force && !state.sound.win) return null;
    const overrideBuf = winnerItem && winnerItem.winSound ? itemWinSoundBuffers[winnerItem.id] : null;
    if(overrideBuf) return playBufferOneShot(overrideBuf, state.sound.volumes.win);
    return playWin(force);
  }
  function playSpinStart(force){
    if(!force && !state.sound.spinStart) return null;
    const ac = audioCtx();
    const customBuf = state.sound.source.spinStart === 'custom' ? pickRandomBuffer('spinStart') : null;
    const startVol = state.sound.volumes.spinStart;
    if(customBuf){
      const src = ac.createBufferSource();
      src.buffer = customBuf;
      const gain = ac.createGain();
      gain.gain.value = startVol * normGainFor(customBuf);
      src.connect(gain); gain.connect(ac.destination);
      src.start();
      return src;
    }
    getVariant('spinStart').play(ac, startVol);
    return null;
  }

  /* ============================ CONFETTI ============================ */
  const cctx = el.confetti.getContext('2d');
  function fitConfetti(){
    el.confetti.width = el.confetti.parentElement.clientWidth;
    el.confetti.height = el.confetti.parentElement.clientHeight;
  }
  function burstConfetti(){
    fitConfetti();
    const colors = paletteColors();
    const particles = Array.from({length: 90}).map(()=>({
      x: el.confetti.width/2, y: 40,
      vx: (Math.random()-0.5)*7, vy: Math.random()*-4-2,
      g: 0.18 + Math.random()*0.08,
      size: 4+Math.random()*4,
      color: colors[Math.floor(Math.random()*colors.length)],
      rot: Math.random()*Math.PI, vr: (Math.random()-0.5)*0.3,
      life: 0, maxLife: 90+Math.random()*30
    }));
    let frame = 0;
    function step(){
      frame++;
      cctx.clearRect(0,0,el.confetti.width, el.confetti.height);
      let alive = false;
      particles.forEach(p=>{
        if(p.life > p.maxLife) return;
        alive = true;
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
        const alpha = 1 - p.life/p.maxLife;
        cctx.save();
        cctx.globalAlpha = Math.max(0, alpha);
        cctx.translate(p.x, p.y);
        cctx.rotate(p.rot);
        cctx.fillStyle = p.color;
        cctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        cctx.restore();
      });
      if(alive) requestAnimationFrame(step);
      else cctx.clearRect(0,0,el.confetti.width, el.confetti.height);
    }
    step();
  }

  /* ============================ SPIN ============================ */
  let spinning = false;
  let rafId = null;
  let cancelRequested = false;

  function pickWeightedIndex(){
    const tw = totalWeight();
    let r = Math.random()*tw;
    for(let i=0;i<state.items.length;i++){
      const w = Math.max(0, Number(state.items[i].weight)||0);
      r -= w;
      if(r <= 0) return i;
    }
    return state.items.length-1;
  }

  function easeFn(name){
    if(name === 'linear') return t=>t;
    if(name === 'quint') return t=> 1 - Math.pow(1-t, 5);
    return t=> 1 - Math.pow(1-t, 3); // cubic
  }

  function computeTickSchedule(segs, from, to, angleOffset){
    const events = [];
    segs.forEach(seg=>{
      const b = ((seg.start % 360)+360)%360;
      const base = ((360 - b - angleOffset) % 360 + 360) % 360;
      let k = Math.ceil((from - base)/360);
      let R = base + 360*k;
      while(R <= to){
        if(R >= from) events.push(R);
        k++; R = base + 360*k;
      }
    });
    events.sort((a,b)=>a-b);
    return events;
  }

  function doSpin(){
    if(spinning) return;
    stopActivePreview();
    if(state.items.length < 2 || totalWeight() <= 0){
      flashMessage('Add at least two items with weight > 0 to spin.', 'Notice');
      return;
    }
    spinning = true;
    cancelRequested = false;
    stopIdleSpin();
    clearTimeout(flashTimer);
    setSpinButtonsState(true);
    el.winnerBanner.classList.remove('show');
    stopWinSound();
    playSpinStart();

    if(state.settings.randomizeAngle){
      state.settings.angle = Math.floor(Math.random()*360);
      el.angleRange.value = state.settings.angle;
      el.angleVal.textContent = state.settings.angle+'°';
      persistState();
    }

    const segs = segmentGeometry();
    const winnerIdx = pickWeightedIndex();
    const seg = segs[winnerIdx];
    const span = seg.end - seg.start;
    const pad = Math.min(span*0.18, 6);
    const targetLocal = span > pad*2
      ? seg.start + pad + Math.random()*(span - pad*2)
      : (seg.start+seg.end)/2;

    const from = currentRotation;
    const base = (( -targetLocal - state.settings.angle - from) % 360 + 360) % 360;
    const to = from + base + 360*state.settings.spins;

    const schedule = computeTickSchedule(segs, from, to, state.settings.angle);
    let scheduleIdx = 0;

    const duration = state.settings.duration*1000;
    const ease = easeFn(state.settings.easing);
    const startTime = performance.now();

    let rotationTimeline = null;
    if(state.settings.nearMiss && segs.length > 1){
      // hover somewhere near a neighboring slice — sometimes short of the
      // winner (so the final nudge continues forward to reach it), and
      // sometimes just past it (so the final nudge reels back to it) —
      // and only partway across the slice boundary rather than squarely
      // inside a whole neighboring slice, so it genuinely reads as
      // undecided rather than "obviously stopped on this other item"
      const neighborIdx = (winnerIdx - 1 + segs.length) % segs.length;
      const neighborSpan = segs[neighborIdx] ? (segs[neighborIdx].end - segs[neighborIdx].start) : (360/segs.length);
      const direction = Math.random() < 0.5 ? 1 : -1;
      const decoyOffset = direction * Math.max(4, neighborSpan * (0.25 + Math.random()*0.4));
      rotationTimeline = buildNearMissTimeline(from, to-decoyOffset, to, duration, ease, true);
    }
    const totalSpinDuration = rotationTimeline ? rotationTimeline.totalDuration : duration;

    startWhir();

    function frame(now){
      if(cancelRequested){
        abortSpin();
        return;
      }
      const elapsed = now-startTime;
      const prevRotation = currentRotation;
      currentRotation = rotationTimeline
        ? rotationTimeline.valueAt(Math.min(elapsed, totalSpinDuration))
        : from + (to-from)*ease(Math.min(1, elapsed/duration));
      drawWheel();

      // ticks
      while(scheduleIdx < schedule.length && schedule[scheduleIdx] <= currentRotation){
        playTick();
        scheduleIdx++;
      }
      // whir pitch follows instantaneous speed
      const instSpeed = (currentRotation-prevRotation); // degrees this frame
      const maxSpeed = (to-from)/ (duration/1000) / 60 * 2.2;
      updateWhir(Math.min(1, instSpeed/Math.max(1,maxSpeed)));

      if(elapsed < totalSpinDuration){
        rafId = requestAnimationFrame(frame);
      } else {
        currentRotation = to;
        drawWheel();
        finishSpin(seg.item, winnerIdx);
      }
    }
    rafId = requestAnimationFrame(frame);
  }

  function cancelSpin(){
    if(!spinning) return;
    cancelRequested = true;
  }

  function abortSpin(){
    if(rafId) cancelAnimationFrame(rafId);
    rafId = null;
    spinning = false;
    cancelRequested = false;
    stopWhir();
    setSpinButtonsState(false);
    flashMessage('Spin cancelled', 'Cancelled');
  }

  function finishSpin(winnerItem, winnerIdx){
    spinning = false;
    rafId = null;
    setSpinButtonsState(false);
    if(state.sound.duckOnWin && whirNodes){
      duckWhir();
    } else {
      stopWhir();
    }
    winSoundNode = playWinForItem(winnerItem);
    burstConfetti();
    clearTimeout(flashTimer); // don't let a leftover notice-timer hide this banner early
    el.bannerLabel.textContent = 'Winner';
    el.winnerText.textContent = winnerItem.label;
    applyBannerImage(winnerItem);
    el.winnerBanner.classList.add('show');

    history.unshift({
      id: id(),
      time: Date.now(),
      wheelName: state.wheelName,
      result: winnerItem.label
    });
    if(history.length > 300) history = history.slice(0,300);
    persistHistory();
    renderHistory();
    // idle spin intentionally does NOT resume here — see hideBanner()
  }

  el.spinBtn.addEventListener('click', handleSpinPress);
  if(el.slotSpinBtn) el.slotSpinBtn.addEventListener('click', handleSpinPress);
  window.addEventListener('keydown', (e)=>{
    if(e.code === 'Space' && !isTypingTarget(e.target)){
      e.preventDefault();
      handleSpinPress();
    }
  });
  function isTypingTarget(t){
    const tag = (t.tagName||'').toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || t.isContentEditable;
  }

  let flashTimer = null;
  function flashMessage(msg, label){
    clearBannerImage(); // generic notices never show the winner image
    el.bannerLabel.textContent = label || 'Notice';
    el.winnerText.textContent = msg;
    el.winnerBanner.classList.add('show');
    clearTimeout(flashTimer);
    flashTimer = setTimeout(hideBanner, 2600);
  }
  // The single path that actually dismisses the banner — idle spin only resumes
  // from here, so it stays paused for as long as any banner (win or notice) is up.
  function hideBanner(){
    clearTimeout(flashTimer);
    el.winnerBanner.classList.remove('show');
    if(whirDucked) stopWhir();
    stopWinSound();
    startIdleSpin();
  }
  el.winnerBannerClose.addEventListener('click', hideBanner);


  /* ============================ SAVED WHEELS ============================ */
  function renderSaved(){
    el.savedList.innerHTML = '';
    const names = Object.keys(savedWheels);
    if(names.length === 0){
      const empty = document.createElement('div');
      empty.className = 'empty-note';
      empty.textContent = 'No saved wheels yet.';
      el.savedList.appendChild(empty);
      return;
    }
    names.forEach(name=>{
      const cfg = savedWheels[name];
      const row = document.createElement('div');
      row.className = 'saved-item';
      const meta = document.createElement('div');
      meta.className = 'meta';
      const clipCount = SOUND_DEFS.reduce((sum,d)=> sum + ((cfg.customSounds && cfg.customSounds[d.key]) ? cfg.customSounds[d.key].length : 0), 0);
      const clipNote = clipCount ? ` · ${clipCount} custom clip${clipCount===1?'':'s'}` : '';
      meta.innerHTML = `<div class="name">${escapeHtml(name)}</div><div class="sub">${cfg.items.length} item${cfg.items.length===1?'':'s'}${clipNote}</div>`;
      const loadBtn = document.createElement('button');
      loadBtn.className = 'btn small primary'; loadBtn.textContent = 'Load';
      loadBtn.addEventListener('click', async ()=>{
        state = JSON.parse(JSON.stringify(cfg));
        // each saved wheel keeps its own clip references (see saveWheelBtn below) —
        // resolve those back into playable clips instead of leaving whatever custom
        // sounds happened to be active for the previously-loaded wheel.
        customSounds = await resolveWheelCustomSounds(cfg);
        customBuffers = { music: [], tick: [], win: [], spinStart: [] };
        await decodeAllCustomSounds();
        backfillState(); // a wheel saved with an older app version may be missing newer sound/settings fields — also sets uiPaletteGroup
        el.wheelName.value = state.wheelName;
        await preloadItemImages(state.items);
        await preloadItemWinSounds(state.items);
        syncSettingsUI(); syncSoundUI(); renderPaletteGroupSelect(); renderPaletteGrid();
        renderItems(); drawWheel(); persistState();
        await persistClipIndex(); // so this wheel's clips are what a page reload picks back up
        if(state.settings.idleSpin) startIdleSpin(); else stopIdleSpin();
        switchTab('items');
      });
      const delBtn = document.createElement('button');
      delBtn.className = 'btn small danger'; delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', confirmable(()=>{
        delete savedWheels[name];
        persistSavedWheels(); renderSaved();
      }, 'Delete', 'Sure?'));
      row.append(meta, loadBtn, delBtn);
      el.savedList.appendChild(row);
    });
  }
  // Turns a saved wheel's lightweight clip references ({id,name,size}, no audio data)
  // back into playable clips by pulling each one's bytes from its own storage key.
  // Refs that no longer resolve (e.g. the clip was since deleted) are quietly skipped.
  async function resolveWheelCustomSounds(wheelCfg){
    const resolved = { music: [], tick: [], win: [], spinStart: [] };
    const refs = wheelCfg.customSounds || {};
    for(const d of SOUND_DEFS){
      const list = Array.isArray(refs[d.key]) ? refs[d.key] : [];
      for(const ref of list){
        const dataURL = await fetchClipDataURL(ref.id);
        if(dataURL) resolved[d.key].push({ id: ref.id, name: ref.name, size: ref.size, dataURL });
      }
    }
    return resolved;
  }
  el.saveWheelBtn.addEventListener('click', ()=>{
    const name = (el.saveNameInput.value || state.wheelName || 'Untitled Wheel').trim();
    if(!name) return;
    savedWheels[name] = JSON.parse(JSON.stringify(state));
    savedWheels[name].wheelName = name;
    // snapshot which custom clips belong to this wheel — metadata only. The actual
    // audio bytes already live in their own storage key from when they were
    // uploaded, so they aren't duplicated into the (size-limited) saved-wheels blob.
    savedWheels[name].customSounds = {};
    SOUND_DEFS.forEach(d=>{
      savedWheels[name].customSounds[d.key] = (customSounds[d.key]||[]).map(c=> ({ id: c.id, name: c.name, size: c.size }));
    });
    el.saveNameInput.value = '';
    persistSavedWheels(); renderSaved();
  });

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  /* ============================ HISTORY ============================ */
  function renderHistory(){
    el.historyList.innerHTML = '';
    // tally
    const counts = {};
    history.forEach(h=>{ counts[h.result] = (counts[h.result]||0)+1; });
    el.tallyBox.innerHTML = '';
    Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).slice(0,10).forEach(k=>{
      const chip = document.createElement('span');
      chip.className = 'tally-chip';
      chip.innerHTML = `${escapeHtml(k)} <b>×${counts[k]}</b>`;
      el.tallyBox.appendChild(chip);
    });

    if(history.length === 0){
      const empty = document.createElement('div');
      empty.className = 'empty-note';
      empty.textContent = 'No spins yet. Give it a go!';
      el.historyList.appendChild(empty);
      return;
    }
    history.slice(0,150).forEach(h=>{
      const row = document.createElement('div');
      row.className = 'hist-item';
      const d = new Date(h.time);
      const info = document.createElement('div');
      info.style.display = 'flex'; info.style.flex = '1'; info.style.justifyContent = 'space-between'; info.style.gap = '10px';
      info.innerHTML = `<span class="who">${escapeHtml(h.result)}</span><span class="meta">${escapeHtml(h.wheelName)}<br>${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>`;
      const rm = document.createElement('button');
      rm.className = 'rm'; rm.innerHTML = '✕'; rm.title = 'Remove this result';
      rm.addEventListener('click', ()=> removeHistoryItem(h.id));
      row.append(info, rm);
      el.historyList.appendChild(row);
    });
  }
  function removeHistoryItem(entryId){
    history = history.filter(h=> h.id !== entryId);
    persistHistory(); renderHistory();
  }
  el.clearHistoryBtn.addEventListener('click', confirmable(()=>{
    history = [];
    persistHistory(); renderHistory();
  }, 'Clear history', 'Really clear?'));

  /* ============================ BACKUP (export/import settings) ============================ */
  async function exportSettings(){
    // gather every item image referenced by the active wheel or any saved wheel,
    // pulling from storage anything not already cached in memory, so a restored
    // backup doesn't leave saved wheels with missing pictures
    const neededImageIds = new Set();
    state.items.forEach(it=>{ if(it.image) neededImageIds.add(it.id); });
    Object.values(savedWheels).forEach(w=>{
      (w.items||[]).forEach(it=>{ if(it.image) neededImageIds.add(it.id); });
    });
    const images = {};
    for(const itemId of neededImageIds){
      let dataURL = itemImages[itemId];
      if(dataURL === undefined){
        try{
          const res = await window.storage.get('item-image:'+itemId);
          dataURL = (res && res.value) ? JSON.parse(res.value) : null;
        }catch(e){ dataURL = null; }
      }
      if(dataURL) images[itemId] = dataURL;
    }

    // per-item winner-sound overrides — same approach as item images: gather every
    // one referenced by the active wheel or any saved wheel, from memory or storage
    const neededWinSoundIds = new Set();
    state.items.forEach(it=>{ if(it.winSound) neededWinSoundIds.add(it.id); });
    Object.values(savedWheels).forEach(w=>{
      (w.items||[]).forEach(it=>{ if(it.winSound) neededWinSoundIds.add(it.id); });
    });
    const winSounds = {};
    for(const itemId of neededWinSoundIds){
      let dataURL = itemWinSounds[itemId];
      if(dataURL === undefined){
        try{
          const res = await window.storage.get('item-win-sound:'+itemId);
          dataURL = (res && res.value) ? JSON.parse(res.value) : null;
        }catch(e){ dataURL = null; }
      }
      if(dataURL) winSounds[itemId] = dataURL;
    }

    // Custom sound clips live in their own storage key per clip, referenced by id from
    // both the active session (customSounds) and each saved wheel's own clip list — not
    // duplicated inline. For a full backup, resolve every id referenced anywhere into one
    // flat library carrying the actual audio bytes, so every wheel's own clips survive
    // an export/import round trip, not just whichever wheel happens to be active.
    const clipMeta = {}; // id -> {id,name,size}, first metadata we find for it
    SOUND_DEFS.forEach(d=> (customSounds[d.key]||[]).forEach(c=>{ if(!clipMeta[c.id]) clipMeta[c.id] = { id:c.id, name:c.name, size:c.size }; }));
    Object.values(savedWheels).forEach(w=>{
      const refs = w.customSounds || {};
      SOUND_DEFS.forEach(d=> (refs[d.key]||[]).forEach(c=>{ if(!clipMeta[c.id]) clipMeta[c.id] = { id:c.id, name:c.name, size:c.size }; }));
    });
    const clipLibrary = {};
    for(const clipId of Object.keys(clipMeta)){
      const dataURL = await fetchClipDataURL(clipId);
      if(dataURL) clipLibrary[clipId] = { ...clipMeta[clipId], dataURL };
    }
    const currentCustomSoundRefs = {};
    SOUND_DEFS.forEach(d=>{
      currentCustomSoundRefs[d.key] = (customSounds[d.key]||[]).map(c=> ({ id:c.id, name:c.name, size:c.size }));
    });

    const payload = {
      type: 'pickwheel-settings-backup',
      version: 2,
      exportedAt: new Date().toISOString(),
      state,
      savedWheels,
      customPalettes,
      currentCustomSoundRefs,
      clipLibrary,
      itemImages: images,
      itemWinSounds: winSounds
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = (state.wheelName || 'pickwheel').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
    a.href = url;
    a.download = `${safeName}-settings-backup.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    flashMessage('Settings exported.', 'Exported');
  }

  async function importSettingsFromFile(file){
    let payload;
    try{
      const text = await file.text();
      payload = JSON.parse(text);
    }catch(e){
      flashMessage("That file isn't valid JSON.", 'Import failed');
      return;
    }
    if(!payload || typeof payload !== 'object' || !payload.state){
      flashMessage("That doesn't look like a PickWheel settings backup.", 'Import failed');
      return;
    }
    if(!window.confirm('This replaces your current wheel, saved wheels, palettes, and sound settings with the ones in this file. Your spin history is kept either way. Continue?')){
      return;
    }

    // stop anything currently playing/spinning before swapping everything out from under it
    if(spinning) abortSpin();
    stopWhir();
    stopActivePreview();

    Object.assign(state, payload.state);
    savedWheels = (payload.savedWheels && typeof payload.savedWheels === 'object') ? payload.savedWheels : {};
    customPalettes = (payload.customPalettes && typeof payload.customPalettes === 'object') ? payload.customPalettes : {};

    itemImages = {};
    if(payload.itemImages && typeof payload.itemImages === 'object'){
      Object.keys(payload.itemImages).forEach(k=>{ itemImages[k] = payload.itemImages[k]; });
    }

    itemWinSounds = {};
    itemWinSoundBuffers = {};
    if(payload.itemWinSounds && typeof payload.itemWinSounds === 'object'){
      Object.keys(payload.itemWinSounds).forEach(k=>{ itemWinSounds[k] = payload.itemWinSounds[k]; });
    }

    // v2 backups carry a flat clip library (one entry per unique clip, full audio data)
    // plus lightweight id references from the current session and each saved wheel.
    // v1 backups (from before per-wheel clip support) only had one flat customSounds
    // set with the data inline — treat that as both the library and the current refs.
    customSounds = { music: [], tick: [], win: [], spinStart: [] };
    customBuffers = { music: [], tick: [], win: [], spinStart: [] };
    if(payload.clipLibrary){
      for(const clipId of Object.keys(payload.clipLibrary)){
        await persistClip(payload.clipLibrary[clipId]); // writes custom-clip:<id>
      }
      const refs = payload.currentCustomSoundRefs || {};
      SOUND_DEFS.forEach(d=>{
        const list = Array.isArray(refs[d.key]) ? refs[d.key] : [];
        customSounds[d.key] = list.map(ref=>{
          const lib = payload.clipLibrary[ref.id];
          return lib ? { id: ref.id, name: lib.name, size: lib.size, dataURL: lib.dataURL } : null;
        }).filter(Boolean);
      });
    } else if(payload.customSounds){ // old v1 backup — flat clips with inline data, no per-wheel refs
      SOUND_DEFS.forEach(d=>{
        const clips = Array.isArray(payload.customSounds[d.key]) ? payload.customSounds[d.key] : [];
        customSounds[d.key] = clips.map(c=> ({ id: c.id || id(), name: c.name, size: c.size, dataURL: c.dataURL }));
      });
    }

    backfillState();

    // persist everything we just swapped in
    persistState();
    await persistSavedWheels();
    await persistCustomPalettes();
    await persistClipIndex();
    if(!payload.clipLibrary){
      // v1 fallback path — clipLibrary already persists clips itself above, this
      // only runs for the older flat-customSounds format
      for(const d of SOUND_DEFS){
        for(const clip of customSounds[d.key]){ await persistClip(clip); }
      }
    }
    for(const itemId of Object.keys(itemImages)){
      if(itemImages[itemId]) await persistItemImage(itemId, itemImages[itemId]);
    }
    for(const itemId of Object.keys(itemWinSounds)){
      if(itemWinSounds[itemId]) await persistItemWinSound(itemId, itemWinSounds[itemId]);
    }
    await decodeAllCustomSounds();
    await decodeAllItemWinSounds();

    // refresh every part of the UI that reads from state/customSounds/etc.
    el.wheelName.value = state.wheelName;
    syncSettingsUI();
    syncSoundUI();
    renderPaletteGroupSelect();
    renderPaletteGrid();
    renderPaletteBuilder();
    renderItems();
    renderSaved();
    fitCanvas();
    drawWheel();
    flashMessage('Settings imported.', 'Imported');
  }

  el.exportSettingsBtn.addEventListener('click', exportSettings);
  el.importSettingsBtn.addEventListener('click', ()=> el.importSettingsFile.click());
  el.importSettingsFile.addEventListener('change', ()=>{
    const file = el.importSettingsFile.files && el.importSettingsFile.files[0];
    el.importSettingsFile.value = '';
    if(file) importSettingsFromFile(file);
  });

  /* ============================ INIT ============================ */
  async function init(){
    await loadAll();
    el.wheelName.value = state.wheelName;
    syncSettingsUI();
    syncSoundUI();
    renderPaletteGroupSelect();
    renderPaletteGrid();
    renderPaletteBuilder();
    renderItems();
    renderSaved();
    renderHistory();
    fitCanvas();
    fitConfetti();
    decodeAllCustomSounds();
    applyWheelStyle();
  }
  init();

})();