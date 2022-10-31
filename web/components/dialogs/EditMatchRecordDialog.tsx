import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Button, Flex } from 'rebass';
import { useCustomTheme } from '../../assets/useCustomTheme';
import {
    EMatchResult,
    getMatchResult,
    IMatchRecord,
} from '../../domain/MatchRecord';
import { NetworkCode } from '../../middleware/CustomFetch';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';
import FInput from '../FInput';
import FLabel from '../FLabel';
import FRadio from '../FRadio';
import FRow from '../FRow';

type EditMatchRecordDialogProps = {
    match: IMatchRecord;
};

const EditMatchRecordDialog = (props: EditMatchRecordDialogProps) => {
    const { primary, secondary, success, successFocus } = useCustomTheme();

    const { updateMatchRecord } = useMatchRecordApi();

    const [opponent, setOponent] = useState(props.match.opponent);
    const [result, setResult] = useState<
        'won' | 'stalled' | 'tied' | 'lost' | ''
    >(getMatchResult(props.match));
    const [approximateDuration, setApproximateDuration] = useState(
        props.match.approximate_match_duration
    );
    const [resultBy, setResultBy] = useState<EMatchResult>(
        props.match.result_by
    );
    const [submissionType, setSubmissionType] = useState(
        props.match.submission_type
    );
    const [notes, setNotes] = useState(props.match.notes);
    const [positionsStruggledIn, setPositionsStruggledIn] = useState<string[]>(
        props.match.positions_struggled_in
    );

    const [saveDisabled, setSaveDisabled] = useState(true);

    useEffect(() => {
        let shouldDisable = true;
        if (
            opponent !== '' &&
            result !== '' &&
            approximateDuration !== 0 &&
            resultBy !== EMatchResult.DEFAULT &&
            submissionType !== ''
            // positionsStruggledIn.length > 0
        ) {
            shouldDisable = false;
        }

        setSaveDisabled(shouldDisable);
    }, [
        opponent,
        result,
        approximateDuration,
        resultBy,
        submissionType,
        notes,
        positionsStruggledIn,
    ]);

    const handleUpdateMatchRecord = async () => {
        const recordToUpdate: IMatchRecord = {
            match_id: props.match.match_id,
            opponent: opponent.toLocaleLowerCase(),
            won: result === 'won',
            lost: result === 'lost',
            tied: result === 'tied',
            stalled: result === 'stalled',
            approximate_match_duration: approximateDuration,
            result_by: resultBy,
            submission_type: submissionType.toLocaleLowerCase(),
            positions_struggled_in:
                positionsStruggledIn?.map((position: string) => {
                    return position.toLocaleLowerCase();
                }) ?? [],
            notes: notes,
            recorded_on: 0,
        };

        const updateResult = await updateMatchRecord(
            recordToUpdate,
            props.match.match_id
        );
        // console.log('addResult', addResult);
        if (updateResult.status === NetworkCode.OK) {
            // focus cursor on opponent field after submission
            document.getElementById('opponent')?.focus();
            toast.success('Match record added successfully!');
        } else {
            toast.error('Error adding match record.');
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
                <FRow style={{ marginTop: '2em' }}>
                    <FLabel>Opponent *</FLabel>
                    <FInput
                        id="opponent"
                        type="text"
                        name="opponent"
                        onChange={(e) => {
                            setOponent(e.target.value);
                        }}
                        value={opponent}
                    />
                </FRow>
                <FRow>
                    <FLabel>Result *</FLabel>
                    <FLabel>
                        <FRadio
                            name="result"
                            onClick={(e) => setResult('won')}
                        />
                        Won
                    </FLabel>
                    <FLabel>
                        <FRadio
                            name="result"
                            onClick={(e) => setResult('stalled')}
                        />
                        Stalled
                    </FLabel>
                    <FLabel>
                        <FRadio
                            name="result"
                            onClick={(e) => setResult('tied')}
                        />
                        Tied
                    </FLabel>
                    <FLabel>
                        <FRadio
                            name="result"
                            onClick={(e) => setResult('lost')}
                        />
                        Lost
                    </FLabel>
                </FRow>
                <FRow>
                    <FLabel>Result By *</FLabel>
                    <FLabel>
                        <FRadio
                            name="resultby"
                            onClick={(e) => setResultBy(EMatchResult.POINTS)}
                        />
                        Points
                    </FLabel>
                    <FLabel>
                        <FRadio
                            name="resultby"
                            onClick={(e) =>
                                setResultBy(EMatchResult.SUBMISSION)
                            }
                        />
                        Submission
                    </FLabel>
                </FRow>

                <FRow>
                    <FLabel>Approximate Duration *</FLabel>
                    <FInput
                        type="number"
                        name="approximateDuration"
                        onChange={(e) => {
                            setApproximateDuration(
                                parseInt(e.target.value, 10)
                            );
                        }}
                        value={approximateDuration}
                    />
                </FRow>

                <FRow>
                    <FLabel>Submission Type *</FLabel>
                    <FInput
                        type="text"
                        name="submissionType"
                        onChange={(e) => {
                            setSubmissionType(e.target.value);
                        }}
                        value={submissionType}
                    />
                </FRow>
                <FRow>
                    <FLabel>Notes</FLabel>
                    <FInput
                        type="text"
                        name="notes"
                        onChange={(e) => {
                            setNotes(e.target.value);
                        }}
                        value={notes}
                    />
                </FRow>

                <Button
                    disabled={saveDisabled}
                    backgroundColor={saveDisabled ? 'grey' : success}
                    marginTop="1em"
                    sx={
                        saveDisabled === false
                            ? {
                                  transition: 'all 0.3s ease',
                                  ':hover': {
                                      opacity: 0.8,
                                      cursor: 'pointer',
                                  },
                                  ':focus': {
                                      // outline: 'none',
                                      outline: 'none',
                                      borderColor: success,
                                      boxShadow: `0 0 0 0.2rem green`,
                                  },
                              }
                            : {}
                    }
                    onClick={handleUpdateMatchRecord}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
};

export default EditMatchRecordDialog;
