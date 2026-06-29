(function () {
    const STORAGE = 'expenseTrackerProV3';
    let items = [];

    // DOM
    const balDiv = document.getElementById('totalBalanceDisplay');
    const incDiv = document.getElementById('incomeTotal');
    const expDiv = document.getElementById('expenseTotal');
    const listEl = document.getElementById('historyList');
    const descInp = document.getElementById('descInput');
    const amtInp = document.getElementById('amountInput');
    const addBtn = document.getElementById('addTransactionBtn');
    const errBox = document.getElementById('errorMessage');
    const incomeRadio = document.getElementById('typeIncome');
    const expenseRadio = document.getElementById('typeExpense');

    let errTimer;
    const showErr = msg => {
        clearTimeout(errTimer);
        errBox.textContent = msg;
        errBox.classList.add('show');
        errTimer = setTimeout(() => errBox.classList.remove('show'), 2800);
    };
    const clearErr = () => {
        clearTimeout(errTimer);
        errBox.classList.remove('show');
    };

    const fmtNum = n => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(Math.abs(n));
    const fmtDate = d => d ? new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Unknown';

    const save = () => localStorage.setItem(STORAGE, JSON.stringify(items));
    const load = () => {
        const raw = localStorage.getItem(STORAGE);
        items = raw ? JSON.parse(raw) : [];
        items.forEach(t => { if (!t.dateCreated) t.dateCreated = t.id || Date.now(); });
        save();
    };

    const calc = () => {
        let inc = 0, exp = 0, bal = 0;
        items.forEach(t => {
            bal += t.amount;
            t.amount > 0 ? inc += t.amount : exp += Math.abs(t.amount);
        });
        return { inc, exp, bal };
    };

    const updateBalance = bal => {
        if (bal < 0) {
            balDiv.innerHTML = `⚠️ Insufficient Balance <span style="font-size:0.9rem;">(Overdrawn: $${fmtNum(Math.abs(bal))})</span>`;
            balDiv.classList.add('insufficient');
        } else {
            balDiv.innerHTML = `$${fmtNum(bal)}`;
            balDiv.classList.remove('insufficient');
        }
    };

    const render = () => {
        const { inc, exp, bal } = calc();
        incDiv.textContent = `+$${fmtNum(inc)}`;
        expDiv.textContent = `-$${fmtNum(exp)}`;
        updateBalance(bal);

        if (!items.length) {
            listEl.innerHTML = `<div class="empty-message">✨ No transactions yet. Add your first entry above.</div>`;
            return;
        }

        const sorted = [...items].sort((a, b) => (b.dateCreated || b.id) - (a.dateCreated || a.id));
        listEl.innerHTML = sorted.map(item => `
            <li class="history-item ${item.amount > 0 ? 'income-badge' : 'expense-badge'}">
                <div class="item-info">
                    <button class="delete-btn" data-id="${item.id}">✕ Delete</button>
                    <span class="item-description">${escapeHtml(item.description)}</span>
                    <span class="item-date">${fmtDate(item.dateCreated)}</span>
                </div>
                <span class="item-amount" style="color:${item.amount > 0 ? 'var(--accent-success-dark)' : 'var(--accent-danger)'}">
                    ${item.amount > 0 ? '+' : '-'}$${fmtNum(item.amount)}
                </span>
            </li>
        `).join('');
        // attach delete events
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const id = Number(btn.dataset.id);
                items = items.filter(i => i.id !== id);
                save();
                render();
            });
        });
    };

    const escapeHtml = str => str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[m]);

    const addTransaction = () => {
        clearErr();
        const description = descInp.value.trim();
        const rawAmount = amtInp.value.trim();
        if (!description) return showErr('❌ Please enter a description.');
        if (!rawAmount) return showErr('💰 Please enter an amount.');
        let amountVal = parseFloat(rawAmount);
        if (isNaN(amountVal) || amountVal <= 0) return showErr('⚠️ Please enter a positive number for amount.');
        if (description.length > 60) return showErr('📝 Description too long (max 60).');

        // Determine sign based on selected radio button
        const isIncome = incomeRadio.checked;
        const finalAmount = isIncome ? amountVal : -amountVal;

        const now = new Date();
        items.push({
            id: now.getTime(),
            description: description,
            amount: finalAmount,
            dateCreated: now.toISOString()
        });
        save();
        render();
        descInp.value = '';
        amtInp.value = '';
        descInp.focus();
    };

    addBtn.addEventListener('click', addTransaction);
    [descInp, amtInp].forEach(inp => inp.addEventListener('keypress', e => { if (e.key === 'Enter') addTransaction(); }));
    load();
    render();
})();