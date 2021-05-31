package dao;

import java.util.List;

import entity.News;
import entity.NewsExample;
import org.apache.ibatis.annotations.Param;

public interface NewsMapper {
    int countByExample(NewsExample example);

    int deleteByExample(NewsExample example);

    int deleteByPrimaryKey(int id);

    int insert(News record);

    int insertSelective(News record);

    List<News> selectByExampleWithBLOBs(NewsExample example);

    List<News> selectByExample(NewsExample example);

    News selectByPrimaryKey(int id);

    int updateByExampleSelective(@Param("record") News record, @Param("example") NewsExample example);

    int updateByExampleWithBLOBs(@Param("record") News record, @Param("example") NewsExample example);

    int updateByExample(@Param("record") News record, @Param("example") NewsExample example);

    int updateByPrimaryKeySelective(News record);

    int updateByPrimaryKeyWithBLOBs(News record);

    int updateByPrimaryKey(News record);
}