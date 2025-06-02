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
            updated: "02-06-2025a"
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
                    location: [1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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
                    subject: "Sistem Operasi (Teori)",
                    date: "03-06-2025",
                    type: "REPLACEMENT"
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
                    subject: "Minggu Ujian UAS",
                    date: {
                        start: "07-07-2025",
                        end: "12-07-2025"
                    },
                    type: "HOLIDAY"
                },
            ]
        }
    },
}
