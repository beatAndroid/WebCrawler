 /**  
 @Description:Query demo
 */ 
package com.jikexuyuan.study;  

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.BooleanClause.Occur;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.PhraseQuery;
import org.apache.lucene.search.PrefixQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TermRangeQuery;
import org.apache.lucene.search.WildcardQuery;
import org.apache.lucene.util.Version;
  
public class QueryStudy {

	/**  
	 * @param args
	 * @Author:lulei  
	 * @Description:  
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//搜索关键词
		String key = "极客学院";
		//搜索单个域的域名
		String field = "name";
		//搜索多个域的域名数组
		String [] fields = {"name", "content"};
		//Query创建过程中的分词技术
		Analyzer analyzer = new StandardAnalyzer(Version.LUCENE_43);
		Query query = null;
		
		//对单个域创建查询语句
		QueryParser parser = new QueryParser(Version.LUCENE_43, field, analyzer);
		try {
			query = parser.parse(key);
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
		System.out.println(QueryParser.class + query.toString());
		
		//对多个域创建查询语句
		MultiFieldQueryParser parser1 = new MultiFieldQueryParser(Version.LUCENE_43, fields, analyzer);
		try {
			query = parser1.parse(key);
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}
		System.out.println(MultiFieldQueryParser.class + query.toString());
		
		//词条查询语句
		query = new TermQuery(new Term(field, key));
		System.out.println(TermQuery.class + query.toString());
		
		//前缀查询语句
		query = new PrefixQuery(new Term(field, key));
		System.out.println(PrefixQuery.class + query.toString());
		
		//多余查询语句
		PhraseQuery query1 = new PhraseQuery();
		//设置短语之间的最大距离
		query1.setSlop(2);
		query1.add(new Term(field, "极客学院"));
		query1.add(new Term(field, "Lucene案例"));
		System.out.println(PhraseQuery.class + query1.toString());
		
		//通配符查询语句，Lucene中有 * ? 两个通配符， *表示任意多个字符，?表示一个任意字符
		query = new WildcardQuery(new Term(field, "极客学院?"));
		System.out.println(WildcardQuery.class + query.toString());
		
		//字符串范围查询
		query = TermRangeQuery.newStringRange(field, "abc", "azz", false, false);
		System.out.println(TermRangeQuery.class + query.toString());
		
		//布尔查询
		BooleanQuery query2 = new BooleanQuery();
		query2.add(new TermQuery(new Term(field, "极客学院")), Occur.SHOULD);
		query2.add(new TermQuery(new Term(field, "Lucene")), Occur.MUST);
		query2.add(new TermQuery(new Term(field, "案例")), Occur.MUST_NOT);
		System.out.println(BooleanQuery.class + query2.toString());
	}

}
