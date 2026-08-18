function initSidebar() {
  var btn = document.getElementById('menuBtn');
  var sb = document.getElementById('sidebar');
  if (btn && sb) {
    btn.addEventListener('click', function () {
      sb.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== btn) {
        sb.classList.remove('open');
      }
    });
  }
}

function initProgress() {
  var bar = document.getElementById('readProgress');
  if (!bar) return;
  function update() {
    var doc = document.documentElement;
    var total = doc.scrollHeight - doc.clientHeight;
    var ratio = total > 0 ? window.scrollY / total : 0;
    bar.style.width = (ratio * 100) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function initBackTop() {
  var btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initMindmap() {
  var container = document.getElementById('mindmap');
  if (!container) return;

  var data = {
    label: '模型 MOD 制作流程',
    children: [
      { label: '游戏与引擎', hot: true, children: ['Unity', 'UE 虚幻引擎', 'Source 起源引擎', 'RE 引擎', 'FromSoft 只狼/法环', '各种单机游戏'] },
      { label: '逆向解包', hot: true, children: ['aesfinder 找密钥', '帧转储 dump', 'Ninja Ripper', '网格 mesh 提取'] },
      { label: '模型与绑骨', children: ['权重重做', '权重传递', '骨骼权重', '骨骼改名', '权重改名', '骨骼合并插件', '改名脚本', '无绑骨'] },
      { label: '贴图与材质', children: ['金属度', '粗糙度', '基础色', '环境光遮蔽', '发光颜色', '发光度', '透明度/遮罩', '法线贴图', '凹凸', '普通材质', 'SSS 贴', 'MOD 加密'] },
      { label: '动作', children: ['骨骼动画', '逐帧动画'] },
      { label: '挂载加载', hot: true, children: ['Mod Engine', '3dmigoto Loader'] },
      { label: '发布分享', children: ['N 网', '香蕉网', '爱发电', '视频网站', '踩蘑菇等社区'] }
    ]
  };

  var svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'lines');
  container.appendChild(svg);

  var rootWrap = document.createElement('div');
  rootWrap.className = 'mm-root-wrap';
  var root = document.createElement('div');
  root.className = 'mm-root';
  root.textContent = data.label;
  rootWrap.appendChild(root);
  container.appendChild(rootWrap);

  var level1 = document.createElement('div');
  level1.className = 'mm-level1';
  container.appendChild(level1);

  var branches = [];
  data.children.forEach(function (b) {
    var box = document.createElement('div');
    box.className = 'mm-branch';
    var t = document.createElement('div');
    t.className = 'mm-btitle';
    t.textContent = b.label;
    box.appendChild(t);
    var kids = document.createElement('div');
    kids.className = 'mm-children';
    b.children.forEach(function (c) {
      var k = document.createElement('div');
      k.className = 'mm-child' + (b.hot ? ' hot' : '');
      k.textContent = c;
      kids.appendChild(k);
    });
    box.appendChild(kids);
    level1.appendChild(box);
    branches.push(box);
  });

  function centerOf(el) {
    var r = el.getBoundingClientRect();
    var cr = container.getBoundingClientRect();
    return { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height / 2 };
  }

  function draw(from, to) {
    var d = Math.max(6, Math.abs(to.y - from.y) / 2);
    var path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M' + from.x + ',' + from.y + ' C' + from.x + ',' + (from.y + d) + ' ' + to.x + ',' + (to.y - d) + ' ' + to.x + ',' + to.y);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(79,140,255,0.4)');
    path.setAttribute('stroke-width', '1.5');
    svg.appendChild(path);
  }

  function layout() {
    svg.setAttribute('width', container.clientWidth);
    svg.setAttribute('height', container.clientHeight);
    svg.innerHTML = '';
    var rc = centerOf(root);
    branches.forEach(function (b) {
      var bc = centerOf(b);
      draw({ x: rc.x, y: rc.y + 18 }, { x: bc.x, y: bc.y - 14 });
      var kids = b.querySelectorAll('.mm-child');
      kids.forEach(function (k) {
        var kc = centerOf(k);
        draw({ x: bc.x, y: bc.y + 14 }, { x: kc.x, y: kc.y });
      });
    });
  }

  window.addEventListener('resize', layout);
  setTimeout(layout, 60);
  layout();
}

document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  initProgress();
  initBackTop();
  initMindmap();

  var active = document.querySelector('.sidebar a.active');
  if (active) active.scrollIntoView({ block: 'center' });

  document.querySelectorAll('.content a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        var top = t.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});
