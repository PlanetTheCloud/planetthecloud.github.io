/**
 * TODO: Place overrides in a common place for common holidays
 */
const DEFAULT_SCHEDULE = {
    "5-IFBSORE-2526": {
        metadata: {
            identifier: "5-IFBSORE-2526",
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "15-09-2025", // 15 Sep 2025
            end: "15-09-2026", // 15 Sep 2026
            semester: 5,
            academicYear: "2025/2026",
            updated: "12-1-2025c"
        },
        schedules: {
            regularClasses: [
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    day: [1],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    day: [2],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1],
                },
                {
                    subject: "Bahasa Indonesia (Teori)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:05",
                        },
                    ],
                    location: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P1/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00",
                            tolerance: "19:35",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Metodologi Penelitian (Teori)",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:00",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:45",
                        },
                    ],
                    location: [1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
                },
                {
                    subject: "Startup Digital (Teori)",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 2, 2],
                },
            ],
            events: [
                {
                    subject: "Istirahat",
                    day: [1, 2, 3, 4, 5],
                    type: "BREAK",
                    time: [
                        {
                            start: "19:10",
                            end: "19:30"
                        }
                    ],
                }
            ],
            overrides: [
                {
                    subject: "Startup Digital (Teori)",
                    date: "19-09-2025",
                    type: "NOSHOW"
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    date: "30-09-2025",
                    type: "NOSHOW"
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    type: "NOSHOW",
                    date: "02-10-2025"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    type: "NOSHOW",
                    date: "06-10-2025"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    type: "NOSHOW",
                    date: "08-10-2025"
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    type: "NOSHOW",
                    date: "14-10-2025"
                },
                {
                    subject: "Startup Digital (Teori)",
                    type: "REPLACEMENT",
                    date: "31-10-2025",
                    location: 2
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    type: "REPLACEMENT",
                    date: "03-11-2025",
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    type: "REPLACEMENT",
                    date: "04-11-2025",
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    type: "REPLACEMENT",
                    date: "05-11-2025",
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    type: "REPLACEMENT",
                    date: "06-11-2025",
                },
                {
                    subject: "Startup Digital (Teori)",
                    type: "REPLACEMENT",
                    date: "07-11-2025",
                    location: 2
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    type: "REPLACEMENT",
                    date: "08-11-2025",
                    location: 2
                },
                {
                    subject: "Persiapan Ujian UAS",
                    date: {
                        start: "03-11-2025",
                        end: "08-11-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Ujian UTS",
                    date: {
                        start: "10-11-2025",
                        end: "15-11-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Bahasa Indonesia (Teori)",
                    examType: "UTS",
                    date: "10-11-2025",
                    type: "EXAM",
                    classroom: "ONLINE",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    examType: "UTS",
                    date: "10-11-2025",
                    type: "EXAM",
                    classroom: "ONLINE",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Metodologi Penelitian (Teori)",
                    examType: "UTS",
                    date: "11-11-2025",
                    type: "EXAM",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    examType: "UTS",
                    date: "12-11-2025",
                    type: "EXAM",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Startup Digital (Teori)",
                    examType: "UTS",
                    date: "13-11-2025",
                    type: "EXAM",
                    classroom: "ONLINE",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    examType: "UTS",
                    date: "14-11-2025",
                    type: "EXAM",
                    classroom: "ONLINE",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    examType: "UTS",
                    date: "14-11-2025",
                    type: "EXAM",
                    classroom: "ONLINE",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    type: "NOSHOW",
                    date: "17-11-2025"
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    type: "NOSHOW",
                    date: "18-11-2025"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    type: "NOSHOW",
                    date: "19-11-2025"
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    type: "NOSHOW",
                    date: "20-11-2025"
                },
                {
                    subject: "Libur Natal dan Tahun Baru",
                    date: {
                        start: "24-12-2025",
                        end: "02-01-2026"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Persiapan UAS",
                    date: {
                        start: "12-01-2026",
                        end: "16-01-2026"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    type: "REPLACEMENT",
                    date: "10-01-2026",
                    time: [
                        {
                            start: "16:00",
                            end: "17:00",
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    type: "REPLACEMENT",
                    date: "12-01-2026",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                        }
                    ],
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Praktek)",
                    type: "REPLACEMENT",
                    date: "12-01-2026",
                    time: [
                        {
                            start: "19:30",
                            end: "21:00",
                        }
                    ],
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    type: "REPLACEMENT",
                    date: "13-01-2026",
                },
                {
                    subject: "Bahasa Indonesia (Teori)",
                    type: "REPLACEMENT",
                    date: "14-01-2026",
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    type: "REPLACEMENT",
                    date: "14-01-2026",
                    location: 1,
                },
                {
                    subject: "Metodologi Penelitian (Teori)",
                    type: "REPLACEMENT",
                    date: "15-01-2026",
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    type: "REPLACEMENT",
                    date: "15-01-2026",
                    location: 2,
                },
                {
                    subject: "Startup Digital (Teori)",
                    type: "REPLACEMENT",
                    date: "17-01-2026",
                    location: 2,
                },
                {
                    subject: "Minggu Ujian UAS",
                    date: {
                        start: "19-01-2026",
                        end: "23-01-2026"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Bahasa Indonesia (Teori)",
                    examType: "UAS",
                    date: "19-01-2026",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Bahasa Inggris (Teori)",
                    examType: "UAS",
                    date: "20-01-2026",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Metodologi Penelitian (Teori)",
                    examType: "UAS",
                    date: "21-01-2026",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Back-End (Teori)",
                    examType: "UAS",
                    date: "22-01-2026",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Startup Digital (Teori)",
                    examType: "UAS",
                    date: "22-01-2026",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    examType: "UAS",
                    date: "23-01-2026",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 1,
                },
            ]
        }
    },
    "6-IFBSORE-2627": {
        metadata: {
            identifier: "6-IFBSORE-2627",
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "02-03-2026", // 2 Mar 2026
            end: "02-09-2026", // 2 Sep 2026
            semester: 6,
            academicYear: "2026/2027",
            updated: "03-03-2026x"
        },
        schedules: {
            regularClasses: [
                /**
                 * @property {string} subject Subject name
                 * @property {int[]} day Day of the class (1 = Monday, 2 = Tuesday, so on)
                 * @property {string} type Class type (REGULAR, REPLACEMENT, EXAM, HOLIDAY)
                 * @property {object[]} time Hour and minute when the class starts
                 * @property {int[]} location Where the class is being held (0 = Unknown, 1 = Onsite, 2 = Online)
                 */
                {
                    subject: "Kriptografi dan Keamanan Informasi",
                    day: [1],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Aplikasi Gim",
                    day: [2],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2],
                },
                {
                    subject: "Visi Komputer",
                    day: [3],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Karakter: Pancasila",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:05",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Karakter: Kewarganegaraan",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:45",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Komputasi Awan",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
            ],
            events: [
                {
                    subject: "Istirahat",
                    day: [1, 2, 3, 4, 5],
                    type: "BREAK",
                    time: [
                        {
                            start: "19:10",
                            end: "19:30"
                        }
                    ],
                }
            ],
            overrides: [
                {
                    subject: "Kriptografi dan Keamanan Informasi",
                    type: "NOSHOW",
                    date: "16-03-2026"
                },
                {
                    subject: "Pengembangan Karakter: Kewarganegaraan",
                    type: "NOSHOW",
                    date: "05-03-2026"
                },
            ]
        }
    },
}
