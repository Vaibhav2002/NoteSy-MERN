export enum Labels {
    Home = "Home",
    Entertainment = "Entertainment",
    Work = "Work",
    School = "School",

}

export function fromLabelText(label: string): Labels | undefined {
    switch (label) {
        case Labels.Home.toString():
            return Labels.Home
        case Labels.Work.toString():
            return Labels.Work
        case Labels.School.toString():
            return Labels.School
        case Labels.Entertainment.toString():
            return Labels.Entertainment
        default:
            return undefined
    }
}