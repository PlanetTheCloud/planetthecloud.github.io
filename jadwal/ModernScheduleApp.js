/**
 * Modern Schedule App — Alpine.js + Schedulinator
 * Features: theme system (dark/light), holiday-aware weekly locations, full schedule tables
 */

const THEMES = {
    crimson: {
        name: 'Crimson Night',
        accent: '#dc2626', accentHover: '#b91c1c',
        accentDark: '#7f1d1d', accentMuted: '#991b1b',
        accentGlow: 'rgba(220, 38, 38, 0.1)', accentTextLight: '#fca5a5',
        preview: '#dc2626'
    },
    ocean: {
        name: 'Ocean Depth',
        accent: '#0891b2', accentHover: '#0e7490',
        accentDark: '#164e63', accentMuted: '#155e75',
        accentGlow: 'rgba(8, 145, 178, 0.1)', accentTextLight: '#67e8f9',
        preview: '#0891b2'
    },
    forest: {
        name: 'Forest Shadow',
        accent: '#16a34a', accentHover: '#15803d',
        accentDark: '#14532d', accentMuted: '#166534',
        accentGlow: 'rgba(22, 163, 74, 0.1)', accentTextLight: '#86efac',
        preview: '#16a34a'
    },
    amethyst: {
        name: 'Royal Amethyst',
        accent: '#9333ea', accentHover: '#7e22ce',
        accentDark: '#581c87', accentMuted: '#6b21a8',
        accentGlow: 'rgba(147, 51, 234, 0.1)', accentTextLight: '#d8b4fe',
        preview: '#9333ea'
    },
    midnight: {
        name: 'Midnight Blue',
        accent: '#3b82f6', accentHover: '#2563eb',
        accentDark: '#1e3a5f', accentMuted: '#1d4ed8',
        accentGlow: 'rgba(59, 130, 246, 0.1)', accentTextLight: '#93c5fd',
        preview: '#3b82f6'
    },
    sunset: {
        name: 'Sunset Blaze',
        accent: '#ea580c', accentHover: '#c2410c',
        accentDark: '#7c2d12', accentMuted: '#9a3412',
        accentGlow: 'rgba(234, 88, 12, 0.1)', accentTextLight: '#fdba74',
        preview: '#ea580c'
    }
};

const MODE_PRESETS = {
    dark: {
        bgPrimary: '#000000', bgSecondary: '#1a1a1a',
        cardBg: 'rgba(0, 0, 0, 0.7)', cardBgSolid: 'rgba(0, 0, 0, 0.7)',
        textPrimary: '#ffffff', textSecondary: 'rgba(255,255,255,0.8)',
        textMuted: 'rgba(255,255,255,0.6)',
        surfaceBg: 'rgba(0, 0, 0, 0.5)',
        inputBg: 'rgba(0, 0, 0, 0.5)',
        endedBg: '#1f2937', endedBorder: '#4b5563', endedText: '#9ca3af',
    },
    light: {
        bgPrimary: '#f3f4f6', bgSecondary: '#e5e7eb',
        cardBg: 'rgba(255, 255, 255, 0.85)', cardBgSolid: 'rgba(255, 255, 255, 0.9)',
        textPrimary: '#111827', textSecondary: '#374151',
        textMuted: '#6b7280',
        surfaceBg: 'rgba(255, 255, 255, 0.6)',
        inputBg: 'rgba(255, 255, 255, 0.7)',
        endedBg: '#e5e7eb', endedBorder: '#d1d5db', endedText: '#6b7280',
    }
};

function scheduleApp() {
    return {
        // State
        activeView: 'today',
        metadata: null,
        selectedDate: new Date(),
        selectedDateString: '',
        scheduleCodeInput: '',
        scheduleCodeError: false,
        mobileMenuOpen: false,
        showClearDataConfirm: false,
        todaySchedule: null,
        upcomingSchedule: null,
        weeklyLocations: [],
        showMoreLocations: false,
        showCachedSchedule: false,
        _activeTimerIds: new Set(),
        _dataVersion: 0,

        // Theme
        currentTheme: 'crimson',
        currentMode: 'dark',
        themes: THEMES,

        // Initialize
        init() {
            this.loadTheme();
            this.updateSelectedDateString();
            this.initializeFromURL();
            this.runSchedulinator();
        },

        // ========================
        //  Theme
        // ========================

        loadTheme() {
            const savedTheme = localStorage.getItem('schedulinator_theme');
            const savedMode = localStorage.getItem('schedulinator_mode');
            if (savedTheme && THEMES[savedTheme]) this.currentTheme = savedTheme;
            if (savedMode && MODE_PRESETS[savedMode]) this.currentMode = savedMode;
            this.applyTheme();
        },

        setTheme(themeId) {
            if (!THEMES[themeId]) return;
            this.currentTheme = themeId;
            localStorage.setItem('schedulinator_theme', themeId);
            this.applyTheme();
        },

        setMode(mode) {
            if (!MODE_PRESETS[mode]) return;
            this.currentMode = mode;
            localStorage.setItem('schedulinator_mode', mode);
            this.applyTheme();
        },

        applyTheme() {
            const t = THEMES[this.currentTheme];
            const m = MODE_PRESETS[this.currentMode];
            const s = document.documentElement.style;

            // Accent colors from theme
            s.setProperty('--accent', t.accent);
            s.setProperty('--accent-hover', t.accentHover);
            s.setProperty('--accent-dark', t.accentDark);
            s.setProperty('--accent-muted', t.accentMuted);
            s.setProperty('--accent-glow', t.accentGlow);
            s.setProperty('--accent-text-light', t.accentTextLight);

            // Mode colors
            s.setProperty('--bg-primary', m.bgPrimary);
            s.setProperty('--bg-secondary', m.bgSecondary);
            s.setProperty('--card-bg', m.cardBg);
            s.setProperty('--card-bg-solid', m.cardBgSolid);
            s.setProperty('--text-primary', m.textPrimary);
            s.setProperty('--text-secondary', m.textSecondary);
            s.setProperty('--text-muted', m.textMuted);
            s.setProperty('--surface-bg', m.surfaceBg);
            s.setProperty('--input-bg', m.inputBg);
            s.setProperty('--ended-bg', m.endedBg);
            s.setProperty('--ended-border', m.endedBorder);
            s.setProperty('--ended-text', m.endedText);

            // Light mode needs different accent-text-light (darker for readability)
            if (this.currentMode === 'light') {
                s.setProperty('--accent-text-light', t.accentDark);
            }
        },

        // ========================
        //  URL / inputs
        // ========================

        initializeFromURL() {
            const url = new URL(window.location.href);
            const code = url.searchParams.get('code');
            if (code) {
                this.scheduleCodeInput = code;
                this.handleScheduleCode();
            }
        },

        updateSelectedDateString() {
            const y = this.selectedDate.getFullYear();
            const m = (this.selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const d = this.selectedDate.getDate().toString().padStart(2, '0');
            this.selectedDateString = `${y}-${m}-${d}`;
        },

        setActiveView(view) {
            this.activeView = view;
            this.mobileMenuOpen = false;
            if (view === 'today') this.loadTodayData();
        },

        handleScheduleCode() {
            this.scheduleCodeError = false;
            if (typeof DEFAULT_SCHEDULE === 'undefined' || !DEFAULT_SCHEDULE[this.scheduleCodeInput]) {
                this.scheduleCodeError = true;
                return;
            }
            Schedulinator.setRawData(DEFAULT_SCHEDULE[this.scheduleCodeInput]);
            Schedulinator.setClassCode(this.scheduleCodeInput);
            Schedulinator.loadData(true);
            this.runSchedulinator();
        },

        handleDateChange() {
            const parts = this.selectedDateString.split('-');
            this.selectedDate = new Date(
                parseInt(parts[0], 10),
                parseInt(parts[1], 10) - 1,
                parseInt(parts[2], 10)
            );
            this.loadTodayData();
        },

        // ========================
        //  Core
        // ========================

        runSchedulinator() {
            Schedulinator.init();
            this.metadata = Schedulinator.getMetadata();
            if (this.metadata) {
                document.title = 'Sistem Informasi Jadwal Kelas - ' + this.scheduleCodeInput;
                this._dataVersion = (this._dataVersion || 0) + 1;
                this.loadTodayData();
                this.setActiveView('today');
            }
        },

        loadTodayData() {
            if (!this.metadata) return;
            this._activeTimerIds = new Set();
            const dateString = Schedulinator.dateToString(this.selectedDate);
            this.todaySchedule = Schedulinator.getScheduleByDate(dateString);
            this.upcomingSchedule = Schedulinator.findScheduleAfter(dateString);
            this.loadWeeklyLocations();
        },

        // ========================
        //  Weekly locations (holiday-aware, 7/14)
        // ========================

        loadWeeklyLocations() {
            const limit = this.showMoreLocations ? 14 : 7;
            const locations = [];
            const cached = Schedulinator.data.cached;
            let currentDate = new Date(this.selectedDate);
            let maxScans = limit * 6;
            let scanned = 0;

            while (locations.length < limit && scanned < maxScans) {
                const dateStr = Schedulinator.dateToString(currentDate);
                const schedule = cached[dateStr];

                if (schedule && schedule.length > 0) {
                    if (schedule[0].type === 'HOLIDAY') {
                        const holidayName = schedule[0].subject;
                        const holidayStart = new Date(currentDate);
                        let holidayEnd = new Date(currentDate);

                        let peekDate = new Date(currentDate);
                        peekDate.setDate(peekDate.getDate() + 1);
                        while (scanned < maxScans) {
                            const peekStr = Schedulinator.dateToString(peekDate);
                            const peekSch = cached[peekStr];
                            if (peekSch && peekSch.length > 0 &&
                                peekSch[0].type === 'HOLIDAY' &&
                                peekSch[0].subject === holidayName) {
                                holidayEnd = new Date(peekDate);
                                peekDate.setDate(peekDate.getDate() + 1);
                                scanned++;
                            } else {
                                break;
                            }
                        }

                        const isSingleDay = holidayStart.getTime() === holidayEnd.getTime();
                        locations.push({
                            type: 'holiday',
                            subject: holidayName,
                            startDate: holidayStart,
                            endDate: holidayEnd,
                            dateDisplay: isSingleDay
                                ? this.formatShortDate(holidayStart)
                                : this.formatShortDate(holidayStart) + ' — ' + this.formatShortDate(holidayEnd)
                        });
                        currentDate = new Date(holidayEnd);
                        currentDate.setDate(currentDate.getDate() + 1);
                    } else {
                        let locationCode = 2;
                        schedule.forEach(c => {
                            if (['REGULAR', 'REPLACEMENT', 'ADDITION', 'EXAM'].includes(c.type)) {
                                if (c.location.code < locationCode) locationCode = c.location.code;
                            }
                        });
                        locations.push({
                            type: 'class',
                            date: new Date(currentDate),
                            location: Schedulinator.translateLocationId(locationCode),
                            dateDisplay: this.formatShortDate(currentDate)
                        });
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                } else {
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                scanned++;
            }
            this.weeklyLocations = locations;
        },

        toggleShowMore() {
            this.showMoreLocations = !this.showMoreLocations;
            this.loadWeeklyLocations();
        },

        // ========================
        //  Helpers
        // ========================

        _toLocalDateTime(date, timeStr) {
            const [h, m] = timeStr.split(':').map(Number);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0);
        },

        _generateTimerId() {
            const id = Math.random().toString(36).substr(2, 9);
            this._activeTimerIds.add(id);
            return id;
        },

        _isTimerStillActive(id) {
            return this._activeTimerIds.has(id);
        },

        // ========================
        //  Render: Today
        // ========================

        renderTodaySchedule() {
            if (!this.todaySchedule || this.todaySchedule.length === 0) {
                return `<div class="t-surface-bg t-accent-border border rounded-lg p-4 text-center">
                    <i class="fas fa-info-circle t-accent-light-text mr-2"></i>
                    <span class="t-text font-medium">No classes today</span>
                </div>`;
            }
            return this.todaySchedule.map(c => this.renderClassCard({ ...c, date: this.selectedDate })).join('');
        },

        renderUpcomingSchedule() {
            if (!this.upcomingSchedule) return '';
            const dateDisplay = this.formatDate(this.upcomingSchedule.date);
            const cards = this.upcomingSchedule.schedule
                .map(c => this.renderClassCard({ ...c, date: this.upcomingSchedule.date }))
                .join('');
            return `<div class="mb-4">
                <h3 class="text-lg font-semibold t-text-secondary mb-3">${dateDisplay}</h3>
                ${cards}
            </div>`;
        },

        renderClassCard(classData) {
            const { subject, type, classroom, time, location, meetingCount } = classData;
            const actualDate = classData.date || this.selectedDate;
            const now = new Date();

            let badge = '';
            let timeDisplay = '';
            let timerDisplay = '';

            if (['REGULAR', 'REPLACEMENT', 'ADDITION', 'EXAM'].includes(type)) {
                const locColor = this.getLocationColorClass(location.color);
                const examBadge = type === 'EXAM'
                    ? `<span class="px-2 py-0.5 t-accent-dark-bg text-white text-xs font-semibold rounded-full ml-2">UJIAN${classData.examType ? ' — ' + classData.examType : ''}</span>`
                    : '';
                badge = `<div class="flex items-center flex-wrap gap-1">
                    <span class="px-2 py-0.5 ${locColor} text-xs font-semibold rounded-full">
                        ${location.text} (PERT. ${meetingCount})
                    </span>
                    ${examBadge}
                </div>`;

                timeDisplay = `
                    <div class="flex justify-between items-center t-text-secondary text-sm mt-2 mb-2">
                        ${classroom ? `<span><i class="fas fa-door-open mr-1"></i>${classroom}</span>` : ''}
                        <span><i class="fas fa-clock mr-1"></i>${time.start} — ${time.end}</span>
                    </div>`;

                const classDate = this._toLocalDateTime(actualDate, time.start);
                const toleranceDate = time.tolerance ? this._toLocalDateTime(actualDate, time.tolerance) : null;

                if (classDate > now) {
                    timerDisplay = this._renderFutureClassTimer(classDate, toleranceDate, now);
                } else if (toleranceDate && now < toleranceDate) {
                    const tid = this._generateTimerId();
                    const sec = Math.floor((toleranceDate - now) / 1000);
                    timerDisplay = `
                        <div class="t-accent-dark-bg t-accent-border border rounded p-2" id="timer-card-${tid}">
                            <div class="text-center">
                                <div class="t-text font-medium mb-1">CLASS STARTED</div>
                                <div class="text-sm t-accent-light-text">Tolerance ends in:</div>
                                <div class="t-text font-mono text-lg" id="timer-tolerance-${tid}">--:--:--</div>
                            </div>
                        </div>`;
                    this.$nextTick(() => this._startToleranceTimer(tid, sec));
                } else if (toleranceDate && now >= toleranceDate) {
                    timerDisplay = `<div class="t-ended-bg t-ended-border border rounded p-2 text-center">
                        <span class="t-ended-text font-medium">Class has ended</span>
                    </div>`;
                } else {
                    timerDisplay = `<div class="t-accent-dark-bg t-accent-border border rounded p-2 text-center">
                        <span class="t-text font-medium">CLASS STARTED</span>
                    </div>`;
                }

            } else if (type === 'BREAK') {
                badge = `<span class="px-2 py-0.5 bg-gray-600 text-white text-xs font-semibold rounded-full">ISTIRAHAT</span>`;
                timeDisplay = `<div class="t-text-secondary text-sm mt-2 mb-2">
                    <i class="fas fa-clock mr-1"></i>${time.start} — ${time.end}
                </div>`;

                const breakStart = this._toLocalDateTime(actualDate, time.start);
                const breakEnd = this._toLocalDateTime(actualDate, time.end);

                if (breakStart > now) {
                    const tid = this._generateTimerId();
                    const sec = Math.floor((breakStart - now) / 1000);
                    timerDisplay = `
                        <div class="t-surface-bg t-accent-border border rounded p-2 text-center" id="timer-card-${tid}">
                            <div class="t-accent-light-text font-medium mb-1">Break starts in:</div>
                            <div class="t-text font-mono text-lg" id="timer-break-${tid}">--:--:--</div>
                        </div>`;
                    this.$nextTick(() => this._startBreakTimer(tid, sec));
                } else if (now < breakEnd) {
                    const tid = this._generateTimerId();
                    const sec = Math.floor((breakEnd - now) / 1000);
                    timerDisplay = `
                        <div class="t-accent-dark-bg t-accent-border border rounded p-2 text-center" id="timer-card-${tid}">
                            <div class="t-accent-light-text font-medium mb-1">Break ends in:</div>
                            <div class="t-text font-mono text-lg" id="timer-break-${tid}">--:--:--</div>
                        </div>`;
                    this.$nextTick(() => this._startBreakTimer(tid, sec));
                } else {
                    timerDisplay = `<div class="t-ended-bg t-ended-border border rounded p-2 text-center">
                        <span class="t-ended-text font-medium">Break has ended</span>
                    </div>`;
                }

            } else if (type === 'HOLIDAY') {
                badge = `<span class="px-2 py-0.5 bg-gray-600 text-white text-xs font-semibold rounded-full">LIBUR</span>`;
            }

            // Title + badge on same line, badge right-aligned
            return `
                <div class="t-card-bg backdrop-blur-md rounded-lg p-4 mb-3 t-accent-border border hover:opacity-90 transition-all duration-200">
                    <div class="flex items-start justify-between gap-2 mb-1">
                        <h4 class="t-text font-semibold text-lg leading-tight">${subject}</h4>
                        ${badge}
                    </div>
                    ${timeDisplay}
                    ${timerDisplay}
                </div>`;
        },

        _renderFutureClassTimer(classDate, toleranceDate, now) {
            const tid = this._generateTimerId();
            const secToStart = Math.floor((classDate - now) / 1000);
            let tolDuration = 0;
            if (toleranceDate) {
                tolDuration = Math.floor((toleranceDate - classDate) / 1000);
                if (tolDuration < 0) tolDuration = 0;
            }

            const html = `
                <div class="t-surface-bg t-accent-border border rounded p-2" id="timer-card-${tid}">
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div class="text-center">
                            <div class="t-accent-light-text font-medium">Starts in:</div>
                            <div class="t-text font-mono" id="timer-start-${tid}">--:--:--</div>
                        </div>
                        <div class="text-center">
                            <div class="t-accent-light-text font-medium">Tolerance:</div>
                            <div class="t-text font-mono" id="timer-tolerance-${tid}">--:--:--</div>
                        </div>
                    </div>
                </div>`;
            this.$nextTick(() => this._startClassTimer(tid, secToStart, tolDuration));
            return html;
        },

        // ========================
        //  Timers
        // ========================

        _startClassTimer(tid, secToStart, tolDuration) {
            const startEl = document.getElementById(`timer-start-${tid}`);
            const tolEl = document.getElementById(`timer-tolerance-${tid}`);
            const cardEl = document.getElementById(`timer-card-${tid}`);
            if (!startEl || !tolEl || !cardEl) return;

            if (tolDuration > 0) {
                const p = CountDownTimer.parse(tolDuration);
                tolEl.textContent = this.fmtTimer(0, 0, p.minutes, p.seconds);
            } else {
                tolEl.textContent = 'N/A';
            }

            const self = this;
            const t = new CountDownTimer(Math.max(0, secToStart), 1000);
            t.onTick(function (d, h, m, s) {
                if (!self._isTimerStillActive(tid)) return;
                startEl.textContent = self.fmtTimer(d, h, m, s);
                if (this.expired()) {
                    startEl.textContent = 'CLASS STARTED';
                    cardEl.className = 't-accent-dark-bg t-accent-border border rounded p-2';
                    if (tolDuration > 0) {
                        const t2 = new CountDownTimer(tolDuration, 1000);
                        t2.onTick(function (d2, h2, m2, s2) {
                            if (!self._isTimerStillActive(tid)) return;
                            tolEl.textContent = self.fmtTimer(d2, h2, m2, s2);
                            if (this.expired()) {
                                tolEl.textContent = 'ENDED';
                                cardEl.className = 't-ended-bg t-ended-border border rounded p-2';
                            }
                        });
                        t2.start();
                    }
                }
            });
            t.start();
        },

        _startBreakTimer(tid, seconds) {
            const el = document.getElementById(`timer-break-${tid}`);
            const card = document.getElementById(`timer-card-${tid}`);
            if (!el || !card) return;
            const self = this;
            const t = new CountDownTimer(Math.max(0, seconds), 1000);
            t.onTick(function (d, h, m, s) {
                if (!self._isTimerStillActive(tid)) return;
                el.textContent = self.fmtTimer(d, h, m, s);
                if (this.expired()) {
                    el.textContent = 'ENDED';
                    card.className = 't-ended-bg t-ended-border border rounded p-2 text-center';
                }
            });
            t.start();
        },

        _startToleranceTimer(tid, seconds) {
            const el = document.getElementById(`timer-tolerance-${tid}`);
            const card = document.getElementById(`timer-card-${tid}`);
            if (!el || !card) return;
            const self = this;
            const t = new CountDownTimer(Math.max(0, seconds), 1000);
            t.onTick(function (d, h, m, s) {
                if (!self._isTimerStillActive(tid)) return;
                el.textContent = self.fmtTimer(d, h, m, s);
                if (this.expired()) {
                    card.className = 't-ended-bg t-ended-border border rounded p-2';
                    card.innerHTML = `<div class="text-center">
                        <span class="t-ended-text font-medium">Class has ended</span>
                    </div>`;
                }
            });
            t.start();
        },

        // ========================
        //  Render: Sidebar
        // ========================

        renderWeeklyLocations() {
            if (this.weeklyLocations.length === 0) {
                return '<div class="t-text-muted text-sm text-center">No data available</div>';
            }
            return this.weeklyLocations.map(item => {
                if (item.type === 'holiday') {
                    return `<div class="py-2 t-accent-dark-border border-b last:border-b-0">
                        <div class="flex justify-between items-center">
                            <span class="t-text text-sm font-medium">${item.dateDisplay}</span>
                            <span class="px-2 py-0.5 bg-gray-600 text-white text-xs font-semibold rounded">LIBUR</span>
                        </div>
                        <div class="text-xs t-accent-light-text mt-1">${item.subject}</div>
                    </div>`;
                } else {
                    const color = this.getLocationColorClass(item.location.color);
                    return `<div class="flex justify-between items-center py-2 t-accent-dark-border border-b last:border-b-0">
                        <span class="t-text font-medium">${item.dateDisplay}</span>
                        <span class="px-2 py-0.5 ${color} text-xs font-semibold rounded">${item.location.text}</span>
                    </div>`;
                }
            }).join('');
        },

        // ========================
        //  Render: All Schedule tables
        // ========================

        renderMetadataTable() {
            if (!this.metadata) return '';
            return Object.entries(this.metadata).map(([k, v]) => `
                <tr class="t-accent-dark-border border-b">
                    <td class="py-2 px-4 font-medium">${k}</td>
                    <td class="py-2 px-4">${v}</td>
                </tr>`).join('');
        },

        renderRegularClassesTable() {
            void this._dataVersion;
            if (!Schedulinator.data.raw.schedules?.regularClasses) return '';
            const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            return Schedulinator.data.raw.schedules.regularClasses.flatMap(c =>
                c.time.map(t => `
                    <tr class="t-accent-dark-border border-b">
                        <td class="py-2 px-4 font-medium">${c.subject}</td>
                        <td class="py-2 px-4">${c.day.map(d => dayNames[d]).join(', ')}</td>
                        <td class="py-2 px-4">${c.classroom}</td>
                        <td class="py-2 px-4">${t.start}</td>
                        <td class="py-2 px-4">${t.end}</td>
                        <td class="py-2 px-4">${t.tolerance || 'N/A'}</td>
                    </tr>`)
            ).join('');
        },

        renderLocationPerMeetingTable() {
            void this._dataVersion;
            const classes = Schedulinator.data.raw.schedules?.regularClasses;
            if (!classes) return '';

            const maxMeetings = Math.max(...classes.map(c => c.location.length));
            let headerCells = '';
            for (let i = 1; i <= maxMeetings; i++) {
                headerCells += `<th class="py-2 px-1 text-center text-xs">Pert. ${i}</th>`;
            }
            const header = `<thead><tr class="t-accent-border border-b">
                <th class="py-2 px-3 text-left text-sm">Mata Kuliah</th>
                ${headerCells}
            </tr></thead>`;

            const rows = classes.map(c => {
                const cells = c.location.map(locCode => {
                    const loc = Schedulinator.translateLocationId(locCode);
                    const color = this.getLocationColorClass(loc.color);
                    return `<td class="py-1 px-1 text-center ${color} text-xs font-bold">${loc.text}</td>`;
                }).join('');
                return `<tr class="t-accent-dark-border border-b">
                    <td class="py-2 px-3 font-medium text-sm whitespace-nowrap">${c.subject}</td>
                    ${cells}
                </tr>`;
            }).join('');

            return header + `<tbody>${rows}</tbody>`;
        },

        renderCachedScheduleTable() {
            void this._dataVersion;
            const cached = Schedulinator.data.cached;
            if (!cached) return '';

            let html = '';
            for (const dateStr in cached) {
                let isFirst = true;
                cached[dateStr].forEach(entry => {
                    const readable = this.formatDate(Schedulinator.stringToDate(dateStr));
                    const locColor = entry.location?.color
                        ? this.getLocationColorClass(entry.location.color)
                        : '';
                    html += `<tr class="t-accent-dark-border border-b">
                        <td class="py-1 px-3 text-sm ${isFirst ? 'font-bold' : ''}">${dateStr}</td>
                        <td class="py-1 px-3 text-sm ${isFirst ? 'font-bold' : ''}">${readable}</td>
                        <td class="py-1 px-3 text-sm">${entry.time?.start ?? '-'}</td>
                        <td class="py-1 px-3 text-sm">${entry.time?.end ?? '-'}</td>
                        <td class="py-1 px-3 text-sm">${entry.meetingCount ?? '-'}</td>
                        <td class="py-1 px-3 text-sm">${entry.subject}</td>
                        <td class="py-1 px-3 text-sm ${locColor} font-bold">${entry.location?.text ?? '-'}</td>
                        <td class="py-1 px-3 text-sm">${entry.type}</td>
                    </tr>`;
                    isFirst = false;
                });
            }
            return html;
        },

        // ========================
        //  Utilities
        // ========================

        getLocationColorClass(colorName) {
            const isLight = this.currentMode === 'light';
            const map = {
                'success': isLight ? 'bg-gray-200 text-gray-800 border border-gray-400' : 'bg-white text-black',
                'primary': 't-accent-bg text-white',
                'danger': 't-accent-dark-bg text-white'
            };
            return map[colorName] || 'bg-gray-600 text-white';
        },

        formatDate(date) {
            const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
            return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        },

        formatShortDate(date) {
            const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];
            const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
            return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
        },

        fmtTimer(days, hours, minutes, seconds) {
            const p = [];
            if (days > 0) p.push(days.toString().padStart(2, '0'));
            if (hours > 0 || p.length > 0) p.push(hours.toString().padStart(2, '0'));
            p.push(minutes.toString().padStart(2, '0'));
            p.push(seconds.toString().padStart(2, '0'));
            return p.join(':');
        },

        clearAllData() {
            this._activeTimerIds = new Set();
            Schedulinator.clearStoredData();
            location.reload();
        },

        destroy() {
            this._activeTimerIds = new Set();
        }
    };
}
