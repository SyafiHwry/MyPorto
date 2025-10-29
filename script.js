 // Small helpers and interactions
    document.getElementById('year').textContent = new Date().getFullYear();

    // Projects -> modal
    const projects = document.querySelectorAll('.project');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalImg = document.getElementById('modalImg');

    projects.forEach(card=>{
      const open = () => {
        const title = card.dataset.title || card.querySelector('h4').innerText;
        const desc = card.dataset.desc || card.querySelector('p')?.innerText || '';
        const img = card.dataset.img || '';
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalImg.src = img;
        modalImg.alt = title;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden','false');
      };
      card.addEventListener('click', open);
      card.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') open(); });
    });

    function closeModal(){
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden','true');
    }
    // Close modal on backdrop click
    modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

    // Contact form: no backend — we simulate and show mailto fallback
    function handleContact(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'Pesan dari Portofolio';
      const message = document.getElementById('message').value.trim();
      const status = document.getElementById('formStatus');

      // Simple validation (already required in fields)
      if(!name || !email || !message){
        status.textContent = 'Mohon isi semua field yang dibutuhkan.';
        return;
      }

      // Simulasi pengiriman (tanpa backend)
      status.textContent = 'Pesan disiapkan... (tidak ada backend terpasang)';
      // Buat mailto sebagai fallback
      const mailto = `mailto:email@domain.com?subject=${encodeURIComponent(subject + ' — dari ' + name)}&body=${encodeURIComponent(message + '\n\nKontak: ' + email)}`;
      // Tampilkan link mailto agar user bisa klik
      const confirmText = 'Tidak ada backend. Klik "Kirim via Email" atau gunakan tombol ini: ';
      status.innerHTML = confirmText + `<a href="${mailto}" style="color:var(--accent)">Kirim lewat email</a>`;
    }

    function mailtoFallback(){
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'Pesan dari Portofolio';
      const message = document.getElementById('message').value.trim();
      const mailto = `mailto:email@domain.com?subject=${encodeURIComponent(subject + ' — dari ' + (name || 'Anonim'))}&body=${encodeURIComponent((message || '') + '\n\nKontak: ' + (email || ''))}`;
      window.location.href = mailto;
    }

    // Smooth scrolling for anchors (for better UX)
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
      anchor.addEventListener('click', function(e){
        const target = this.getAttribute('href');
        if(target === '#' || target === '') return;
        const el = document.querySelector(target);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });

    // Accessibility: close modal on ESC
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') closeModal();
    });