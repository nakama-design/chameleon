<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <Card
          title="Total file by created date"
          type="chart"
          :data="chart"
        />
      </div>
      <div class="col-4">
        <Card
          title="Max usage format"
          type="statistics"
          :data="statistics.usage"
        />
      </div>
      <div class="col-4">
        <Card
          title="Maximum size"
          type="statistics"
          :data="statistics.large"
        />
      </div>
      <div class="col-4">
        <Card
          title="Most documented"
          type="statistics"
          :data="statistics.documented"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import Card from "@/components/CardChart.vue";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    Card
  },
  data() {
    return {
      statistics: {
        usage: {},
        large: {},
        documented: {}
      },
      chart: {
        options: {},
        dataset: [],
        labels: []
      },
    };
  },
  mounted() {
    const contentCtx = this.$context;
    const contentKeys = Object.keys(this.$context);
    const maximumKeysLength = contentKeys.reduce((a, b) =>
      this.$context[a] > this.$context[b] ? a : b
    );

    const largeBracket = {};
    const usageBracket = {};
    let usageLabels = [];

    this.statistics.documented = {
      name: maximumKeysLength,
      total: contentCtx[maximumKeysLength].length
    };

    contentKeys.map(type => {
      const chartDataBracket = [];
      const fileCreatedBracket = {};

      contentCtx[type].map(file => {
        largeBracket[file.size] = file;

        if (usageBracket[file.format] && usageBracket[file.format].count) {
          usageBracket[file.format].count++;
        } else {
          usageBracket[file.format] = {
            count: 1
          };
        }

        if (fileCreatedBracket[file.created] && fileCreatedBracket[file.created].count) {
          fileCreatedBracket[file.created].count++;
        } else {
          fileCreatedBracket[file.created] = {
            count: 1
          }
        }
      });

      usageLabels = usageLabels.concat(Object.keys(fileCreatedBracket))
    });

    this.chart.labels = Array.from(new Set(usageLabels))

    contentKeys.map(type => {
      const chartDataBracket = {};

      this.chart.labels.map(timestamp => {
        chartDataBracket[timestamp] = 0
      })

      contentCtx[type].map(file => {
        if (chartDataBracket.hasOwnProperty(file.created.toString())) {
          chartDataBracket[file.created.toString()]++
        }
      });

      this.chart.dataset.push({
        label: type,
        data: Object.values(chartDataBracket)
      });
    });

    const maximumFormatUsage = Object.keys(usageBracket).reduce((a, b) =>
      usageBracket[a] > usageBracket[b] ? a : b
    );

    const largeData = largeBracket[Object.keys(largeBracket).pop()]
    this.statistics.large = {
      name: largeData.name || largeData.componentName,
      total: ((largeData.size || 0) / 1024).toFixed(2) + 'KB'
    };

    this.statistics.usage = {
      name: maximumFormatUsage,
      total: usageBracket[maximumFormatUsage].count
    };
  }
};
</script>
