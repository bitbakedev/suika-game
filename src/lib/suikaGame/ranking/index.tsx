import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface RankingProps {
  isVisible: boolean;
  onClose: () => void;
  currentScore: number;
}

interface RankingEntry {
  score: number;
  date: string;
  rank: number;
}

const Ranking = ({ isVisible, onClose, currentScore }: RankingProps) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      loadRankings();
      setIsSubmitted(false);
      setPlayerName('');
    }
  }, [isVisible]);

  const loadRankings = () => {
    const savedRankings = localStorage.getItem('suika-rankings');
    if (savedRankings) {
      const parsed = JSON.parse(savedRankings);
      setRankings(parsed);
    }
  };

  const saveScore = () => {
    if (!playerName.trim()) {
      alert('이름을 입력해주세요!');
      return;
    }

    const newEntry: RankingEntry = {
      score: currentScore,
      date: new Date().toLocaleDateString('ko-KR'),
      rank: 0
    };

    const savedRankings = localStorage.getItem('suika-rankings');
    let currentRankings: RankingEntry[] = savedRankings ? JSON.parse(savedRankings) : [];
    
    currentRankings.push(newEntry);
    currentRankings.sort((a, b) => b.score - a.score);
    currentRankings = currentRankings.slice(0, 10); // 상위 10개만 저장
    
    // 순위 재계산
    currentRankings.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    localStorage.setItem('suika-rankings', JSON.stringify(currentRankings));
    setRankings(currentRankings);
    setIsSubmitted(true);
  };

  const clearRankings = () => {
    if (confirm('모든 랭킹 기록을 삭제하시겠습니까?')) {
      localStorage.removeItem('suika-rankings');
      setRankings([]);
    }
  };

  if (!isVisible) return null;

  const isNewRecord = rankings.length === 0 || currentScore > (rankings[0]?.score || 0);
  const currentRank = rankings.findIndex(entry => currentScore > entry.score) + 1;
  const displayRank = currentRank === 0 ? rankings.length + 1 : currentRank;

  return (
    <div className={cx('rankingArea')}>
      <div className={cx('rankingModal')}>
        <div className={cx('header')}>
          <h2 className={cx('title')}>🏆 점수 랭킹</h2>
          <button className={cx('closeBtn')} onClick={onClose}>✕</button>
        </div>

        <div className={cx('currentScore')}>
          <div className={cx('scoreInfo')}>
            <span className={cx('label')}>현재 점수</span>
            <span className={cx('score')}>{currentScore}</span>
          </div>
          {isNewRecord && <div className={cx('newRecord')}>🎉 신기록!</div>}
          <div className={cx('rankInfo')}>
            예상 순위: <span className={cx('rank')}>{displayRank}위</span>
          </div>
        </div>

        {!isSubmitted ? (
          <div className={cx('submitArea')}>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className={cx('nameInput')}
              maxLength={10}
            />
            <button className={cx('submitBtn')} onClick={saveScore}>
              점수 등록
            </button>
          </div>
        ) : (
          <div className={cx('submittedMessage')}>
            ✅ 점수가 등록되었습니다!
          </div>
        )}

        <div className={cx('rankingList')}>
          <div className={cx('listHeader')}>
            <span>순위</span>
            <span>이름</span>
            <span>점수</span>
            <span>날짜</span>
          </div>
          {rankings.length === 0 ? (
            <div className={cx('emptyMessage')}>
              아직 등록된 기록이 없습니다.
            </div>
          ) : (
            rankings.map((entry, index) => (
              <div key={index} className={cx('rankingItem', { 
                highlight: entry.score === currentScore && isSubmitted 
              })}>
                <span className={cx('rankNumber')}>
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `${entry.rank}위`}
                </span>
                <span className={cx('playerName')}>익명</span>
                <span className={cx('playerScore')}>{entry.score}</span>
                <span className={cx('playDate')}>{entry.date}</span>
              </div>
            ))
          )}
        </div>

        <div className={cx('actions')}>
          <button className={cx('clearBtn')} onClick={clearRankings}>
            기록 초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;