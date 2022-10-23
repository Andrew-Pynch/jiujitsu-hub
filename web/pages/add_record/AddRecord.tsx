import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Button, Flex } from 'rebass';
import { useCustomTheme } from '../../assets/useCustomTheme';
import FInput from '../../components/FInput';
import FLabel from '../../components/FLabel';
import FRadio from '../../components/FRadio';
import FRow from '../../components/FRow';
import { EMatchResult, IMatchRecord } from '../../domain/MatchRecord';
import { NetworkCode } from '../../middleware/CustomFetch';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';

type AddRecordProps = {};

const AddRecord = (props: AddRecordProps) => {
    const { primary, secondary, success, successFocus } = useCustomTheme();

    const { addMatchRecord } = useMatchRecordApi();

    const [opponent, setOponent] = useState('');
    const [result, setResult] = useState<
        'won' | 'stalled' | 'tied' | 'lost' | ''
    >('');
    const [approximateDuration, setApproximateDuration] = useState(0);
    const [resultBy, setResultBy] = useState<EMatchResult>(
        EMatchResult.DEFAULT
    );
    const [submissionType, setSubmissionType] = useState('');
    const [notes, setNotes] = useState('');
    const [positionsStruggledIn, setPositionsStruggledIn] = useState<string[]>(
        []
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
        console.log(
            opponent !== '',
            result !== '',
            approximateDuration !== 0,
            resultBy !== EMatchResult.DEFAULT,
            submissionType !== '',
            positionsStruggledIn.length > 0
        );
        console.log('setting should disable', shouldDisable);
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

    const handleAddMatchRecord = async () => {
        const recordToAdd: IMatchRecord = {
            match_id: '',
            opponent: opponent,
            won: result === 'won',
            lost: result === 'lost',
            tied: result === 'tied',
            stalled: result === 'stalled',
            approximate_match_duration: approximateDuration,
            result_by: resultBy,
            submission_type: submissionType,
            positions_struggled_in: positionsStruggledIn,
            notes: notes,
        };

        const addResult = await addMatchRecord(recordToAdd);
        console.log('addResult', addResult);
        if (addResult.status === NetworkCode.OK) {
            resetFields();
            // focus cursor on opponent field after submission
            document.getElementById('opponent')?.focus();
            toast.success('Match record added successfully!');
        } else {
            toast.error('Error adding match record.');
        }
    };

    const resetFields = () => {
        setOponent('');
        setResult('');
        setApproximateDuration(0);
        setResultBy(EMatchResult.POINTS);
        setSubmissionType('');
        setNotes('');
        setPositionsStruggledIn([]);
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
                    <p
                        style={{
                            fontSize: 30,
                            fontWeight: 800,
                        }}
                    >
                        Result *
                    </p>
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
                    <p
                        style={{
                            fontSize: 30,
                            fontWeight: 800,
                        }}
                    >
                        Result By *
                    </p>
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
                                      boxShadow: `0 0 0 0.2rem #${successFocus}`,
                                  },
                              }
                            : {}
                    }
                    onClick={handleAddMatchRecord}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
};

export default AddRecord;
