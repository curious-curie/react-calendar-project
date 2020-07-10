import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SearchSchedule() {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { schedules } = useSelector((state) => state.schedules);

  useEffect(() => {
    if (!keyword.length) setSearchResults([]);
    else {
      const results = schedules.filter(
        (schedule) => schedule.title.includes(keyword) || schedule.memo.includes(keyword)
      );
      setSearchResults(results);
    }
  }, [keyword]);

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value.trim())} placeholder="검색어를 입력하세요" />
      {searchResults.map((res) => res.title)}
    </div>
  );
}
