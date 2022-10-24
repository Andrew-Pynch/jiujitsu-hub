export const getFormatedTimeStamp = (time: any) => {
    const timeDate = new Date(time);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (timeDate.toDateString() == today.toDateString()) {
        return (
            'Today at ' +
            new Date(time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })
        );
    } else if (timeDate.toDateString() == yesterday.toDateString()) {
        return (
            'Yesterday at ' +
            new Date(time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })
        );
    } else {
        return timeDate.toLocaleDateString();
    }
};
