package com.cb.yixinger.service.impl;

import com.cb.yixinger.dao.PlaceCommentDao;
import com.cb.yixinger.dao.PlaceCommentMapper;
import com.cb.yixinger.entity.PageBean;
import com.cb.yixinger.entity.PlaceComment;
import com.cb.yixinger.service.PlaceCommentService;
import com.github.pagehelper.PageHelper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * @Description:
 * @author: YFZX-CB-1784 ChenBen
 * @create: 2019-01-16 13:37
 **/
@Service("PlaceCommentService")
public class PlaceCommentServiceImpl implements PlaceCommentService {
    @Autowired
    private PlaceCommentDao placeCommentDao;
    @Autowired
    private PlaceCommentMapper placeCommentMapper;
    private static final Logger logger = LoggerFactory.getLogger(PlaceServiceImpl.class);

    @Override
    public PageBean<PlaceComment> getPlaceCommentByUid(String uid, Integer pageNo, Integer pageSize) {
        List<PlaceComment> placeCommentList = placeCommentDao.getPlaceCommentByUid(uid);
        PageHelper.startPage(pageNo, pageSize);
        int totalCount = placeCommentList.size();
        PageBean<PlaceComment> pageData = new PageBean<>(pageNo, pageSize, totalCount);
        pageData.setItems(placeCommentList);
        return pageData;
    }

    @Override
    public boolean addPlaceComment(PlaceComment placeComment) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = sdf.format(System.currentTimeMillis());
        placeComment.setDate(date);
        return placeCommentMapper.insertSelective(placeComment) > 0;
    }

    /**
     * @Description: 对爬取下来的部分评论进行解析并持久化
     * @Param: [commentList]
     * @return: boolean
     * @Author: Chen Ben
     * @Date: 2019/1/16
     */
    @Transactional
    @Override
    public void addPlaceCommentByReptile(String commentList, String placeId) {
        JSONArray jsonArray = JSONArray.fromObject(commentList);
        for (int i = 0; i < jsonArray.size(); i++) {
            PlaceComment placeComment = new PlaceComment();
            JSONObject jsonObject = (JSONObject) jsonArray.get(i);
            placeComment.setPlaceId(placeId);
            placeComment.setLikes(0);
            placeComment.setDate(jsonObject.getString("date"));
            placeComment.setUserName(jsonObject.getString("user_name"));
            placeComment.setUserImage(jsonObject.getString("user_logo"));
            placeComment.setOverallRating(jsonObject.getDouble("overall_rating"));
            placeComment.setComment(jsonObject.getString("content"));
            placeComment.setImageList(jsonObject.getString("pics"));
            placeComment.setCommentType(1);
            placeCommentMapper.insertSelective(placeComment);
        }
    }

    /**
     * @Description: 根据uid获取爬虫评论
     * @Param: [uid]
     * @return: java.util.List<com.cb.yixinger.entity.PlaceComment>
     * @Author: Chen Ben
     * @Date: 2019/1/16
     */
    @Override
    public List<PlaceComment> getPlaceComment(String uid) {
        Example example = new Example(PlaceComment.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("placeId", uid);
        criteria.andEqualTo("commentType", 1);
        List<PlaceComment> placeCommentList = placeCommentMapper.selectByExample(example);
        return placeCommentList;
    }
}
