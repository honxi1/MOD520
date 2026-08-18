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
  var wrap = document.getElementById('mindmap');
  if (!wrap) return;

  var data = {
    label: '模型 MOD 制作流程',
    children: [
      {
        label: '提取 / 解包', color: '#4f8cff', groups: [
          { label: '目标引擎', items: ['Unity', 'UE 虚幻引擎', 'Source 起源引擎', 'RE 引擎', 'FromSoft 只狼/法环', '各种单机游戏'] },
          { label: '解包工具', items: ['aesfinder 找密钥', '帧转储 dump', 'Ninja Ripper', '网格 mesh 提取'] }
        ]
      },
      {
        label: '编辑', color: '#ff8f4f', groups: [
          { label: '模型处理', items: ['权重重做', '权重传递', '骨骼权重', '骨骼改名', '权重改名', '骨骼合并插件', '改名脚本', '无绑骨'] },
          { label: '3D 软件', items: ['Blender 泛用', '3ds Max 专业', 'ZBrush 雕刻高模', '布料模拟/服装 UV'] },
          { label: '贴图与材质', items: ['基础色', '金属度', '粗糙度', '环境光遮蔽', '发光颜色', '发光度', '透明度/遮罩', '法线贴图', '凹凸', '普通材质', 'SSS 贴', 'MOD 加密'] },
          { label: '贴图软件', items: ['Photoshop', 'paint.net'] },
          { label: '动作', items: ['骨骼动画', '逐帧动画'] }
        ]
      },
      {
        label: '注入', color: '#35c26b', groups: [
          { label: '加载方式', items: ['Mod Engine 挂载', '3dmigoto Loader', '备份原文件'] }
        ]
      },
      {
        label: '发布', color: '#b46fff', groups: [
          { label: '平台', items: ['N 网', '香蕉网', '爱发电', '视频网站', '踩蘑菇等社区'] }
        ]
      }
    ]
  };

  var svgNS = 'http://www.w3.org/2000/svg';
  var canvas = document.createElement('div');
  canvas.className = 'mm-canvas';
  wrap.appendChild(canvas);

  var svg = document.createElementNS(svgNS, 'svg');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  canvas.appendChild(svg);

  function node(cls, text, color) {
    var el = document.createElement('div');
    el.className = 'mm-node ' + cls;
    el.textContent = text;
    if (color) el.style.borderColor = color;
    canvas.appendChild(el);
    return el;
  }

  function line(x1, y1, x2, y2, bend) {
    var dx = x2 - x1, dy = y2 - y1;
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var px = -dy / len, py = dx / len;
    var k = bend * len;
    var p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', 'M' + x1 + ',' + y1 + ' Q' + (mx + px * k) + ',' + (my + py * k) + ' ' + x2 + ',' + y2);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'rgba(79,140,255,0.3)');
    p.setAttribute('stroke-width', '1.5');
    svg.appendChild(p);
  }

  var R1 = 185;          // 一级分支到中心
  var gStep = 60;        // 组节点间距
  var iStep = 34;        // 子节点半径步进
  var side = 0.35;       // 子节点左右交错角度

  var n = data.children.length;
  var maxR = R1 + gStep * 5 + iStep * 6;
  var size = maxR * 2 + 260;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  var cx = size / 2, cy = size / 2;

  var root = node('mm-root', data.label);
  root.style.left = cx + 'px';
  root.style.top = cy + 'px';

  data.children.forEach(function (st, i) {
    var angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    var sx = cx + Math.cos(angle) * R1;
    var sy = cy + Math.sin(angle) * R1;
    var stNode = node('mm-branch', st.label, st.color);
    stNode.style.left = sx + 'px';
    stNode.style.top = sy + 'px';
    line(cx, cy, sx, sy, 0);

    st.groups.forEach(function (g, j) {
      var gr = R1 + gStep * (j + 1);
      var gx = cx + Math.cos(angle) * gr;
      var gy = cy + Math.sin(angle) * gr;
      var gNode = node('mm-group', g.label, st.color);
      gNode.style.left = gx + 'px';
      gNode.style.top = gy + 'px';
      line(sx, sy, gx, gy, 0.2);

      g.items.forEach(function (it, k) {
        var lvl = Math.floor(k / 2);
        var s = (k % 2 === 0) ? 1 : -1;
        var a = angle + s * side;
        var r = gr + iStep + lvl * iStep;
        var ix = cx + Math.cos(a) * r;
        var iy = cy + Math.sin(a) * r;
        var itNode = node('mm-child', it, st.color);
        itNode.style.left = ix + 'px';
        itNode.style.top = iy + 'px';
        line(gx, gy, ix, iy, 0.28);
      });
    });
  });
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
