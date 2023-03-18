export class Labels {
    static readonly Home = new Labels("Home", "#26547c")
    static readonly Entertainment = new Labels("Entertainment", "#ef476f")

    static readonly Work = new Labels("Work", "#ffd166")

    static readonly School = new Labels("School", "#06d6a0")

    private constructor(readonly label: string, readonly color: string) {
    }
}

export const labels = [
    Labels.Home,
    Labels.Entertainment,
    Labels.Work,
    Labels.School
]

export function fromLabelText(label: string): Labels {
    switch (label) {
        case Labels.Home.label:
            return Labels.Home
        case Labels.Work.label:
            return Labels.Work
        case Labels.School.label:
            return Labels.School
        default:
            return Labels.Entertainment
    }
}