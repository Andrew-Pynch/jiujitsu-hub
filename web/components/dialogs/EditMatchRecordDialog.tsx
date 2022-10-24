import { IMatchRecord } from '../../domain/MatchRecord';

type EditMatchRecordDialogProps = {
    match: IMatchRecord;
};

const EditMatchRecordDialog = (props: EditMatchRecordDialogProps) => {
    return <div key={props.match.match_id}>EditMatchRecordDialog</div>;
};

export default EditMatchRecordDialog;
