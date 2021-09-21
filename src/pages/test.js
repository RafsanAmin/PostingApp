import { useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from 'react-virtualized';
import postAPI from '../API/PostsAPI';
import PostCont from '../components/posts/postCont';

export default function Test() {
  const [list, setList] = useState([]);
  const ref = useRef();
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 500,
    })
  );
  useEffect(() => {
    const main = async () => {
      const { posts } = await postAPI.getPost('latest', 0, 150);
      setList(posts);
    };
    main();
  }, []);
  const render = ({ index, key, style, parent }) => (
    <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
      <div style={style}>
        <PostCont post={list[index]} />
      </div>
    </CellMeasurer>
  );
  return (
    <>
      <div ref={ref} style={{ width: '100%', backgroundColor: '#fff' }}>
        Hello
        <WindowScroller scrollElement={ref.current}>
          {({ height, isScrolling, registerChild, scrollTop }) => {
            console.log(scrollTop);
            return (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div ref={registerChild}>
                    <List
                      autoHeight
                      width={width}
                      height={height}
                      deferredMeasurementCache={cache.current}
                      rowHeight={cache.current.rowHeight}
                      rowRenderer={render}
                      rowCount={list.length}
                      scrollTop={scrollTop}
                      isScrolling={isScrolling}
                    />
                  </div>
                )}
              </AutoSizer>
            );
          }}
        </WindowScroller>
      </div>
    </>
  );
}
