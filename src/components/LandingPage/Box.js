import './Box.css';

export const Box = ({ data, title }) => {
  return (
    <div
      className="Box"
      style={{
        marginRight: '20px',
        float: 'left',
        marginBottom: '20px'
      }}
    >
      <div>
        <div className="text1">{title}</div>

        <div className="text2"> {data}</div>
      </div>
    </div>
  );
};
