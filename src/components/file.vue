<template>
  <section class="timeline">
    <h2 id="dream-start"><i class="el-icon-s-flag"></i> 梦开始的地方</h2>
    <ul>
      <li v-for="article in file" :key="article.title">
        <div>
          <time>{{ article.create_time }}</time>
          <div class="discovery">
            <h1><router-link :to="'/web/'+article.id">Title</router-link></h1>
            <p>
              {{ article.title }}
            </p>
          </div>
          <div class="scientist">
            <h1>Creator</h1>
            <span>{{ article.creator.user_name }}</span>
          </div>
        </div>
      </li>
    </ul>
    <h1 ><i class="el-icon-s-promotion"></i> 梦仍在继续</h1>
  </section>
</template>

<script>
export default {
  props: {
    file: {
      type: Array
    }
  },
  methods: {
    isElementInViewport (el) {
      const rect = el.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    callbackFunc () {
      const items = document.querySelectorAll('.timeline li')
      for (let i = 0; i < items.length; i++) {
        if (this.isElementInViewport(items[i])) {
          if (!items[i].classList.contains('in-view')) {
            items[i].classList.add('in-view')
          }
        } else if (items[i].classList.contains('in-view')) {
          items[i].classList.remove('in-view')
        }
      }
    }
  },
  mounted () {
    window.addEventListener('load', this.callbackFunc)
    window.addEventListener('scroll', this.callbackFunc)
  },
  beforeDestroy () {
    window.removeEventListener('load', this.callbackFunc)
    window.removeEventListener('scroll', this.callbackFunc)
  }
}
</script>

<style>
.timeline {
  background: linear-gradient(54deg, #9164ff, #8bfff4);
  color: #3c3f64;
  overflow-x: hidden;
  padding: 100px 0;
}

.timeline > h1,
.timeline > h2 {
  text-align: center;
  font-size: 3em;
}

.timeline ul {
  margin: 50px 0;
}

.timeline ul li {
  list-style-type: none;
  position: relative;
  width: 6px;
  margin: 0 auto;
  padding-top: 50px;
  background: #fff;
}
.timeline ul li::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) rotate(45deg);
  width: 20px;
  height: 20px;
  z-index: 2;
  background: #eee;
}
.timeline ul li div {
  position: relative;
  bottom: 0;
  width: 400px;
  padding: 20px;
  background: #fff;
  box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.timeline ul li div time {
  position: absolute;
  background: #f5af19;
  color: white;
  width: 150px;
  height: 30px;
  top: -15px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
}
.timeline ul li div div {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.timeline ul li div div p {
  text-align: center;
}
.timeline ul li div .discovery {
  margin-right: 10px;
}
.timeline ul li:nth-of-type(odd) > div {
  left: 45px;
}
.timeline ul li:nth-of-type(even) > div {
  left: -484px;
}

.timeline ul li div {
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.timeline ul li:nth-of-type(odd) div {
  transform: translate3d(100px, -10px, 0) rotate(10deg);
}
.timeline ul li:nth-of-type(even) div {
  transform: translate3d(-100px, -10px, 0) rotate(10deg);
}
.timeline ul li.in-view div {
  transform: none;
  visibility: visible;
  opacity: 1;
}

@media screen and (max-width: 900px) {
  .timeline ul li div {
    width: 250px;
    flex-direction: column;
  }
  .timeline ul li div div {
    width: 80%;
    margin: 10px;
  }
  .timeline ul li:nth-of-type(even) > div {
    left: -334px;
  }
}
@media screen and (max-width: 600px) {
  .timeline ul li {
    margin-left: 20px;
  }
  .timeline ul li div {
    width: calc(100vw - 91px);
  }
  .timeline ul li:nth-of-type(even) > div {
    left: 45px;
  }
}
</style>
