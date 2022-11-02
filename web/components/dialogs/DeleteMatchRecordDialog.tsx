import toast from 'react-hot-toast';
import { Box, Flex } from 'rebass';
import { useCustomTheme } from '../../assets/useCustomTheme';
import { IMatchRecord } from '../../domain/MatchRecord';
import { NetworkCode } from '../../middleware/CustomFetch';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';
import { useModalStore } from '../../state/store';
import SexyButton from '../FButton';
import FRow from '../FRow';

type DeleteMatchRecordDialogProps = {
    matches: IMatchRecord[];
    setMatches: React.Dispatch<React.SetStateAction<IMatchRecord[]>>;
    match: IMatchRecord;
    index: number;
};

const DeleteMatchRecordDialog = (props: DeleteMatchRecordDialogProps) => {
    const { danger } = useCustomTheme();

    const { deleteMatchRecordById } = useMatchRecordApi();
    const { toggleFDialog } = useModalStore();

    const handleDeleteMatchRecord = async () => {
        const deleteResult = await deleteMatchRecordById(props.match.match_id);

        if (deleteResult.status === NetworkCode.OK) {
            toast.success('Match record deleted!');

            // remove the match from the matches array
            // const newMatches = props.matches.splice(props.index, 1);
            const newMatches = props.matches.filter(
                (match) => match.match_id !== props.match.match_id
            );
            // update the matches array
            props.setMatches(newMatches);

            toggleFDialog(false, {});
        } else {
            toast.error('Error deleting match record!');
        }
    };

    return (
        <Box>
            <Flex
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <FRow>
                    Are you sure you want to delete this match against{' '}
                    {props.match.opponent}?
                </FRow>
            </Flex>

            <SexyButton
                style={{
                    width: '45%',
                    marginRight: '2.5%',
                }}
                color="grey"
            >
                Cancel
            </SexyButton>
            <SexyButton
                style={{
                    width: '45%',
                    marginLeft: '2.5%',
                }}
                color={danger}
                onClick={() => {
                    handleDeleteMatchRecord();
                }}
            >
                Delete
            </SexyButton>
        </Box>
    );
};

export default DeleteMatchRecordDialog;
