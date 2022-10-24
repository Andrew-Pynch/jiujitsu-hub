import { IMatchRecord } from '../../domain/MatchRecord';

type DeleteMatchRecordDialogProps = {
    match: IMatchRecord;
};

const DeleteMatchRecordDialog = (props: DeleteMatchRecordDialogProps) => {
    return <div key={props.match.match_id}>DeleteMatchRecordDialog</div>;
};

export default DeleteMatchRecordDialog;
