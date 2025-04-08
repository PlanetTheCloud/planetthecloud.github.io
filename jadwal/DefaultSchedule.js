/**
 * TODO: Place overrides in a common place for common holidays
 */
const DEFAULT_SCHEDULE = {
    "1-IFBSORE-2324": {
        metadata: {
            identifier: "1-IFBSORE-2324", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "18-09-2023", // 18 Sept 2023
            end: "08-03-2024", // 8 Mar 2024
            semester: 1,
            academicYear: "2023/2024",
            updated: "17-01-2024"
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
                    subject: "Sistem Otomasi Perkantoran",
                    day: [1],
                    type: "REGULAR",
                    classroom: "A.P2/L3 - Lab 5",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10",
                            tolerance: "17:45",
                        },
                        {
                            start: "19:30",
                            end: "21:00",
                            tolerance: "19:40",
                        }
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pemrograman Komputer (Teori)",
                    day: [2],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
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
                    location: [1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 2],
                },
                {
                    subject: "Pemrograman Komputer (Praktek)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P2/L2 - Lab 2",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10",
                            tolerance: "17:45",
                        }
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    day: [3],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:35",
                        }
                    ],
                    location: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
                },
                {
                    subject: "Wawasan Informatika",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
                },
                {
                    subject: "Pemikiran Desain",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:10",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:35",
                        }
                    ],
                    location: [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2],
                }
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
                /**
                 * Types: HOLIDAY, EXAM, REPLACEMENT (Kelas Pengganti)
                 */
                {
                    subject: "Maulid Nabi Muhammad SAW",
                    date: "28-09-2023",
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Tenang",
                    date: {
                        start: "06-11-2023",
                        end: "10-11-2023"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Wawasan Informatika",
                    date: "06-11-2023",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemrograman Komputer (Teori)",
                    examType: "UTS",
                    date: "13-11-2023",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemrograman Komputer (Praktek)",
                    examType: "UTS",
                    date: "13-11-2023",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemikiran Desain",
                    examType: "UTS",
                    date: "14-11-2023",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    examType: "UTS",
                    date: "15-11-2023",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Wawasan Informatika",
                    examType: "UTS",
                    date: "16-11-2023",
                    type: "EXAM",
                    classroom: "B.T3/L2,B.T5/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Sistem Otomasi Perkantoran",
                    examType: "UTS",
                    date: "17-11-2023",
                    type: "EXAM",
                    classroom: "A.P3/L2 - Lab 1",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Libur Natal & Tahun Baru",
                    date: {
                        start: "25-12-2023",
                        end: "02-01-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Sistem Otomasi Perkantoran",
                    date: "15-01-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    date: "03-01-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemrograman Komputer (Praktek)",
                    date: "20-12-2023",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    date: "17-01-2024",
                    type: "REPLACEMENT",
                    classroom: "C.T6/L3",
                },
                {
                    subject: "Pemrograman Komputer (Praktek)",
                    date: "17-01-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemrograman Komputer (Teori)",
                    date: "16-01-2024",
                    type: "REPLACEMENT",
                    classroom: "B.T2/L2",
                },
                {
                    subject: "Minggu Tenang",
                    date: {
                        start: "15-01-2024",
                        end: "20-01-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pemikiran Desain",
                    examType: "UAS",
                    date: "22-01-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Wawasan Informatika",
                    examType: "UAS",
                    date: "23-01-2024",
                    type: "EXAM",
                    classroom: "B.T3/L3,B.T5/L3",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pemrograman Komputer (Teori)",
                    examType: "UAS",
                    date: "24-01-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemrograman Komputer (Praktek)",
                    examType: "UAS",
                    date: "24-01-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Sistem Otomasi Perkantoran",
                    examType: "UAS",
                    date: "25-01-2024",
                    type: "EXAM",
                    classroom: "A.P3/L2 - Lab 1",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    examType: "UAS",
                    date: "26-01-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
            ]
        }
    },
    "2-IFBSORE-2324": {
        metadata: {
            identifier: "2-IFBSORE-2324", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "04-03-2024", // 4 Mar 2024
            end: "04-09-2024", // 4 Sept 2024
            semester: 2,
            academicYear: "2023/2024",
            updated: "02-07-2024"
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
                    subject: "Pengembangan Web Front-End (Teori)",
                    day: [1],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
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
                    location: [1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    day: [2],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2],
                },
                {
                    subject: "Literasi Digital",
                    day: [3],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:00",
                        },
                    ],
                    location: [1, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P1/L4 - Lab 7",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00",
                            tolerance: "19:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pemikiran Komputasional (Teori)",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
                },
                {
                    subject: "Pemikiran Komputasional (Praktek)",
                    day: [4],
                    type: "REGULAR",
                    classroom: "A.P2/L2 - Lab 2",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00",
                            tolerance: "19:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Matematika Komputasi",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
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
                    location: [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
                },
            ],
            events: [
                {
                    subject: "Istirahat",
                    day: [1, 2, 3, 4, 5],
                    type: "BREAK",
                    time: [
                        {
                            start: "19:05",
                            end: "19:30"
                        }
                    ],
                }
            ],
            overrides: [
                /**
                 * Types: HOLIDAY, EXAM, REPLACEMENT (Kelas Pengganti)
                 */
                {
                    subject: "Hari Suci Nyepi",
                    date: "11-03-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Wafat Isa Almasih",
                    date: "29-03-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Paskah",
                    date: "31-03-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Raya Idul Fitri",
                    date: {
                        start: "10-03-2024",
                        end: "11-03-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Libur Bersama Idul Fitri",
                    date: {
                        start: "08-04-2024",
                        end: "15-04-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Tenang",
                    date: {
                        start: "29-04-2024",
                        end: "03-05-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    date: "03-04-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    date: "29-04-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    date: "30-04-2024",
                    type: "REPLACEMENT",
                    classroom: "C.T6/L3",
                },
                {
                    subject: "Hari Buruh",
                    date: "01-05-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    date: "02-05-2024",
                    type: "REPLACEMENT",
                    classroom: "A.P1/L4",
                },
                {
                    subject: "Matematika Komputasi",
                    date: "03-05-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Matematika Komputasi",
                    examType: "UTS",
                    date: "06-05-2024",
                    type: "EXAM",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pemikiran Komputasional (Teori)",
                    examType: "UTS",
                    date: "07-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemikiran Komputasional (Praktek)",
                    examType: "UTS",
                    date: "07-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    examType: "UTS",
                    date: "08-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    examType: "UTS",
                    date: "08-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    examType: "UTS",
                    date: "08-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Literasi Digital",
                    examType: "UTS",
                    date: "10-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Kenaikan Isa Almasih",
                    date: "09-05-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    date: "14-05-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    date: "15-05-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    date: "20-05-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    date: "21-05-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Hari Raya Waisak",
                    date: "23-05-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Lahir Pancasila",
                    date: "01-06-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Literasi Digital",
                    date: "12-06-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Hari Raya Idul Adha",
                    date: "17-06-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    date: "29-06-2024",
                    type: "REPLACEMENT",
                    time: [
                        {
                            start: "14:00",
                            end: "17:00"
                        }
                    ],
                },
                {
                    subject: "Tahun Baru Islam",
                    date: "07-07-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Tenang",
                    date: {
                        start: "01-07-2024",
                        end: "05-07-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    date: "01-07-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    date: "02-07-2024",
                    type: "REPLACEMENT",
                    classroom: "B.T1/L2",
                },
                {
                    subject: "Literasi Digital",
                    date: "03-07-2024",
                    type: "REPLACEMENT",
                    classroom: "B.T4/L2",
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    date: "03-07-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemikiran Komputasional (Teori)",
                    date: "04-07-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemikiran Komputasional (Praktek)",
                    date: "04-07-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    date: "05-07-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Masa Ujian",
                    date: {
                        start: "08-07-2024",
                        end: "12-07-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Matematika Komputasi",
                    examType: "UAS",
                    date: "08-07-2024",
                    type: "EXAM",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Literasi Digital",
                    examType: "UAS",
                    date: "09-07-2024",
                    type: "EXAM",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pemikiran Komputasional (Teori)",
                    examType: "UAS",
                    date: "11-07-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemikiran Komputasional (Praktek)",
                    examType: "UAS",
                    date: "11-07-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    examType: "UAS",
                    date: "12-07-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Web Front-End (Teori)",
                    examType: "UAS",
                    date: "12-07-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Web Front-End (Praktek)",
                    examType: "UAS",
                    date: "12-07-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Hari Kemerdekaan RI",
                    date: "17-08-2024",
                    type: "HOLIDAY"
                },
            ]
        }
    },
    "3-IFBSORE-2425": {
        metadata: {
            identifier: "3-IFBSORE-2425", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "17-09-2024", // 17 Sept 2024
            end: "17-03-2025", // 17 Mar 2025
            semester: 3,
            academicYear: "2024/2025",
            updated: "17-01-2025"
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
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    day: [1],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "Khristian Tanselmus, S.Kom., M.TI.",
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
                    location: [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Web Back-End (Teori)",
                    day: [2],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
                    lecturer: "Arwin Halim, S.Kom., M.Kom.",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1],
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P1/L2",
                    lecturer: "Khristian Tanselmus, S.Kom., M.TI.",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00",
                            tolerance: "19:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P4/L4",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10",
                            tolerance: "17:40",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Rekayasa Data",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2],
                },
                {
                    subject: "Statistika Komputasi",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T3/L4",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 0],
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
                {
                    subject: "Maulid Nabi Muhammad SAW 1446H",
                    date: "16-09-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    date: "18-09-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Rekayasa Data",
                    date: "26-09-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Rekayasa Data",
                    date: "27-09-2024",
                    classroom: "Hall Gedung C",
                    time: [
                        {
                            start: "13:30",
                            end: "17:05",
                            notes: "Ga harus izin kalau gabisa datang karena akan disediakan recording"
                        }
                    ],
                    type: "ADDITION",
                    location: 1,
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    date: "07-10-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Back-End (Teori)",
                    date: "08-10-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    date: "09-10-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    date: "09-10-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Statistika Komputasi",
                    date: "11-10-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Rekayasa Data",
                    date: "31-10-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    date: "31-10-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Statistika Komputasi",
                    date: "01-11-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Rekayasa Data",
                    date: "01-11-2024",
                    time: [
                        {
                            start: "14:00",
                            end: "17:00",
                            notes: "Kuliah dari praktisi industri secara daring melalui Microsoft Teams"
                        }
                    ],
                    type: "ADDITION",
                    location: 2,
                },
                {
                    subject: "Minggu Persiapan UTS",
                    date: {
                        start: "04-11-2024",
                        end: "09-11-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    date: "04-11-2024",
                    type: "REPLACEMENT",
                    classroom: "B.T4/L2",
                },
                {
                    subject: "Pengembangan Web Back-End (Teori)",
                    date: "05-11-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    date: "06-11-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    date: "06-11-2024",
                    type: "REPLACEMENT",
                    classroom: "A.P1/L2",
                },
                {
                    subject: "Statistika Komputasi",
                    date: "07-11-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    date: "08-11-2024",
                    type: "REPLACEMENT",
                    time: [
                        {
                            start: "17:30",
                            end: "19:00",
                        }
                    ],
                },
                {
                    subject: "Statistika Komputasi",
                    date: "09-11-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Minggu Ujian UTS",
                    date: {
                        start: "11-11-2024",
                        end: "15-11-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Back-End (Teori)",
                    examType: "UTS",
                    date: "12-11-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "13:00",
                            end: "14:40"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    examType: "UTS",
                    date: "12-11-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "13:00",
                            end: "14:40"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Statistika Komputasi",
                    examType: "UTS",
                    date: "13-11-2024",
                    type: "EXAM",
                    classroom: "B.T3/L4, T5/L4",
                    time: [
                        {
                            // UNKNOWN
                            start: "00:00",
                            end: "00:00"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    examType: "UTS",
                    date: "14-11-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "13:00",
                            end: "14:40"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    examType: "UTS",
                    date: "14-11-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "13:00",
                            end: "14:40"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Rekayasa Data",
                    examType: "UTS",
                    date: "15-11-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            // UNKNOWN
                            start: "00:00",
                            end: "00:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    date: "25-11-2024",
                    type: "NOSHOW"
                },
                {
                    subject: "Pilkada 2024",
                    date: "27-11-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Rekayasa Data",
                    date: "28-11-2024",
                    type: "NOSHOW"
                },
                {
                    subject: "Rekayasa Data",
                    date: "29-11-2024",
                    type: "ADDITION"
                },
                {
                    subject: "Rekayasa Data",
                    date: "13-12-2024",
                    type: "ADDITION",
                    location: 2,
                    classroom: "PRAKTISI"
                },
                {
                    subject: "Rekayasa Data",
                    date: "26-12-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Libur Natal dan Tahun Baru",
                    date: {
                        start: "24-12-2024",
                        end: "02-01-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    date: "13-01-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Web Back-End (Teori)",
                    date: "14-01-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    date: "15-01-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    date: "15-01-2025",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Rekayasa Data",
                    date: "16-01-2025",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    date: "17-01-2025",
                    type: "REPLACEMENT",
                    classroom: "A.P1/L3"
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    date: "17-01-2025",
                    type: "REPLACEMENT",
                    classroom: "A.P1/L2"
                },
                {
                    subject: "Persiapan Ujian UAS",
                    date: {
                        start: "13-01-2025",
                        end: "17-01-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Ujian UAS",
                    date: {
                        start: "20-01-2025",
                        end: "25-01-2025"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Back-End (Teori)",
                    examType: "UAS",
                    date: "21-01-2025",
                    type: "EXAM",
                    classroom: "A.P4/L4",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pengembangan Web Back-End (Praktek)",
                    examType: "UAS",
                    date: "21-01-2025",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Statistika Komputasi",
                    examType: "UAS",
                    date: "22-01-2025",
                    type: "EXAM",
                    classroom: "B.T5/L4",
                    time: [
                        {
                            start: "19:30",
                            end: "20:50"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Teori)",
                    examType: "UAS",
                    date: "23-01-2025",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Perancangan dan Pemrograman Berorientasi Objek (Praktek)",
                    examType: "UAS",
                    date: "23-01-2025",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:30",
                            end: "19:10"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Rekayasa Data",
                    examType: "UTS",
                    date: "24-01-2025",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 2,
                },
            ]
        }
    },
    "4-IFBSORE-2425": {
        metadata: {
            identifier: "4-IFBSORE-2425", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "03-03-2025", // 3 Mar 2025
            end: "03-03-2026", // 3 Mar 2026
            semester: 4,
            academicYear: "2024/2025",
            updated: "08-04-2025a"
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
                    location: [1, 2, 1, 1, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
                    location: [1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1],
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
                    subject: "Libur Kenaikan Yesus Kristus",
                    date: "29-05-2025",
                    type: "HOLIDAY"
                },
                {
                    subject: "Sistem Operasi (Teori)",
                    date: "03-06-2025",
                    type: "REPLACEMENT"
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
                    subject: "Kecerdasan Artifisial (Teori)",
                    date: "29-04-2025",
                    type: "REPLACEMENT",
                    classroom: "CEK MIKA"
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
                    subject: "Minggu Ujian UTS",
                    date: {
                        start: "05-05-2025",
                        end: "10-05-2025"
                    },
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
