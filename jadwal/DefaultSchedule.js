/**
 * TODO: Place overrides in a common place for common holidays
 */
const DEFAULT_SCHEDULE = {
    "4-IFBSORE-2425": {
        metadata: {
            identifier: "4-IFBSORE-2425", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "03-03-2025", // 3 Mar 2025
            end: "03-03-2026", // 3 Mar 2026
            semester: 4,
            academicYear: "2024/2025",
            updated: "05-07-2025a"
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
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    day: [1],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "Florida N.S. Damanik, S.T., M.M.",
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
                    location: [1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1],
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    day: [2],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "Andy Thomas, S.Kom., M.Kom.",
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
                    location: [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Perangkat Lunak Tangkas (Teori)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "Nadya Sikana, S.Kom., M.Kom.",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:05",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1],
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P2/L3",
                    lecturer: "Andy Thomas, S.Kom., M.Kom.",
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
                    subject: "Sistem Operasi (Teori)",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "Nurhayati, S.Kom., M.Kom.",
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
                    location: [1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1],
                },
                {
                    subject: "Kecerdasan Artifisial (Teori)",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T4/L4",
                    lecturer: "Khairul Hawani Rambe, B.Sc., M.Eng.",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:45",
                        },
                    ],
                    location: [1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1],
                },
            ],
            events: [
                {
                    subject: "Istirahat",
                    // TO DEPRECATE: Remove day 
                    day: [1, 2, 3, 4, 5],
                    type: "BREAK",
                    // TO DEPRECATE: Remote time
                    time: [
                        {
                            start: "19:10",
                            end: "19:30"
                        }
                    ],
                }
            ],
            overrides: [
                /**
                 * Types: HOLIDAY, EXAM, REPLACEMENT (Kelas Pengganti)
                 */
                // TODO: Note for Sistem Operasi (Teori), Meet number 6, 14, 15, 16 will be held in Labs.
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    date: "11-03-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    date: "12-03-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Sistem Operasi (Teori)",
                    date: "10-04-2025",
                    type: "NOSHOW"
                },
                {
                    subject: "Libur Idul Fitri",
                    date: {
                        start: "31-03-2025",
                        end: "07-04-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Jumat Agung",
                    date: {
                        start: "18-04-2025",
                        end: "19-04-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    date: "29-04-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    date: "30-04-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Kecerdasan Artifisial (Teori)",
                    date: "26-04-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    date: "02-05-2025",
                    type: "REPLACEMENT",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                        }
                    ],
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    date: "02-05-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Persiapan Ujian UTS",
                    date: {
                        start: "28-04-2025",
                        end: "02-05-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Sistem Operasi (Teori)",
                    date: "03-05-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    date: "28-04-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    date: "08-04-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    date: "09-04-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Hari Buruh",
                    date: "01-05-2025",
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Ujian UTS",
                    date: {
                        start: "05-05-2025",
                        end: "10-05-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Kecerdasan Artifisial (Teori)",
                    examType: "UTS",
                    date: "05-05-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    examType: "UTS",
                    date: "06-05-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Perangkat Lunak Tangkas (Teori)",
                    examType: "UTS",
                    date: "07-05-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Sistem Operasi (Teori)",
                    examType: "UTS",
                    date: "08-05-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Sistem Operasi (Praktek)",
                    examType: "UTS",
                    date: "08-05-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    examType: "UTS",
                    date: "09-05-2025",
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
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    examType: "UTS",
                    date: "09-05-2025",
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
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    date: "12-05-2025",
                    type: "NOSHOW"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    date: "13-05-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    date: "14-05-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    date: "19-05-2025",
                    type: "NOSHOW"
                },
                {
                    subject: "Kenaikan Yesus Kristus",
                    date: "29-05-2025",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Raya Idul Adha 1446 Hijriyah",
                    date: "06-06-2025",
                    type: "HOLIDAY"
                },
                {
                    subject: "Tahun Baru Islam 1447 Hijriyah",
                    date: "27-06-2025",
                    type: "HOLIDAY"
                },
                {
                    subject: "Persiapan Ujian UAS",
                    date: {
                        start: "30-06-2025",
                        end: "04-07-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Kecerdasan Artifisial (Teori)",
                    date: "28-06-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    date: "30-06-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    date: "01-07-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    date: "02-07-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Sistem Operasi (Teori)",
                    date: "03-07-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Kecerdasan Artifisial (Teori)",
                    date: "04-07-2025",
                    type: "REPLACEMENT"
                },
                {
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    date: "05-07-2025",
                    type: "REPLACEMENT",
                    time: [
                        {
                            start: "14:00",
                            end: "17:00"
                        }
                    ],
                },
                {
                    subject: "Minggu Ujian UAS",
                    date: {
                        start: "07-07-2025",
                        end: "12-07-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Kecerdasan Artifisial (Teori)",
                    examType: "UAS",
                    date: "07-07-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Organisasi dan Arsitektur Komputer (Teori)",
                    examType: "UAS",
                    date: "08-07-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Perangkat Lunak Tangkas (Teori)",
                    examType: "UAS",
                    date: "09-07-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Sistem Operasi (Teori)",
                    examType: "UAS",
                    date: "10-07-2025",
                    type: "EXAM",
                    classroom: "CEK MIKA",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Aplikasi Mobile Front-End (Teori)",
                    examType: "UAS",
                    date: "11-07-2025",
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
                    subject: "Pengembangan Aplikasi Mobile Front-End (Praktek)",
                    examType: "UAS",
                    date: "11-07-2025",
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
            ]
        }
    },
    "5-IFBSORE-2526": {
        metadata: {
            identifier: "5-IFBSORE-2526",
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "15-09-2025", // 15 Sep 2025
            end: "15-09-2026", // 15 Sep 2026
            semester: 5,
            academicYear: "2025/2026",
            updated: "30-10-2025"
        },
        schedules: {
            regularClasses: [
                {
                    subject: "Pengembangan Aplikasi Mobil Back-End (Teori)",
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
                    location: [1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1],
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
                    subject: "Pengembangan Aplikasi Mobil Back-End (Praktek)",
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
                    subject: "Pengembangan Aplikasi Mobil Back-End (Teori)",
                    type: "NOSHOW",
                    date: "06-10-2025"
                },
                {
                    subject: "Pengembangan Aplikasi Mobil Back-End (Praktek)",
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
                    subject: "Pengembangan Aplikasi Mobil Back-End (Teori)",
                    type: "REPLACEMENT",
                    date: "03-11-2025",
                },
                {
                    subject: "Komunikasi Data dan Jaringan Komputer (Teori)",
                    type: "REPLACEMENT",
                    date: "04-11-2025",
                },
                {
                    subject: "Pengembangan Aplikasi Mobil Back-End (Praktek)",
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
                    subject: "Minggu Ujian UAS",
                    date: {
                        start: "10-11-2025",
                        end: "15-11-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Bahasa Indonesia (Teori)",
                    examType: "UAS",
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
                    examType: "UAS",
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
                    examType: "UAS",
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
                    examType: "UAS",
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
                    examType: "UAS",
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
                    subject: "Pengembangan Aplikasi Mobil Back-End (Teori)",
                    examType: "UAS",
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
            ]
        }
    },
}
